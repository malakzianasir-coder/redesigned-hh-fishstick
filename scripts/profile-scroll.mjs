import { spawn } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
const TARGET_URL = process.argv[2] || 'http://localhost:3000'
const DEBUG_PORT = 9222

class CDPConnection {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this.id = 0
    this.callbacks = new Map()
  }

  async connect() {
    this.ws = new WebSocket(this.wsUrl)
    await new Promise((resolve, reject) => {
      this.ws.onopen = resolve
      this.ws.onerror = reject
    })
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      if (msg.id && this.callbacks.has(msg.id)) {
        const { resolve, reject } = this.callbacks.get(msg.id)
        this.callbacks.delete(msg.id)
        if (msg.error) reject(msg.error)
        else resolve(msg.result)
      }
    }
  }

  send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = ++this.id
      this.callbacks.set(id, { resolve, reject })
      this.ws.send(JSON.stringify({ id, method, params }))
    })
  }

  close() {
    if (this.ws) this.ws.close()
  }
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function fetchJson(url) {
  const res = await fetch(url)
  return res.json()
}

async function runProfilingSuite() {
  console.log(`\n======================================================`)
  console.log(`🚀 AUTOMATED BROWSER PERFORMANCE PROFILER`)
  console.log(`Target: ${TARGET_URL}`)
  console.log(`======================================================\n`)

  // 1. Launch Chrome Headless with Remote Debugging
  const tmpProfileDir = path.join(os.tmpdir(), `chrome-profile-${Date.now()}`)
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${tmpProfileDir}`,
    '--headless=new',
    '--disable-gpu-vsync',
    '--disable-extensions',
    '--disable-background-networking',
    '--no-first-run',
    '--window-size=1440,900',
    'about:blank',
  ])

  // Wait for remote debugging endpoint to be ready
  let wsUrl = null
  for (let i = 0; i < 30; i++) {
    try {
      const targets = await fetchJson(`http://localhost:${DEBUG_PORT}/json/list`)
      const pageTarget = targets.find((t) => t.type === 'page')
      if (pageTarget && pageTarget.webSocketDebuggerUrl) {
        wsUrl = pageTarget.webSocketDebuggerUrl
        break
      }
    } catch {
      await sleep(200)
    }
  }

  if (!wsUrl) {
    chromeProc.kill()
    throw new Error('Could not connect to Chrome DevTools endpoint')
  }

  const cdp = new CDPConnection(wsUrl)
  await cdp.connect()

  // Helper to run a test run
  async function runScrollBenchmark({ label, cpuThrottleRate = 1 }) {
    console.log(`\n▶ Running Scenario: "${label}" (CPU Throttling: ${cpuThrottleRate}x)...`)

    // Enable domains
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpuThrottleRate })

    // Navigate to page
    await cdp.send('Page.navigate', { url: TARGET_URL })
    await sleep(3500) // Wait for initial render and brand loader

    // Inject in-page profiler
    await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        window.__profiler = {
          frames: [],
          longTasks: [],
          layoutShifts: [],
          rafId: null,
          running: true,
          startTime: performance.now(),
          lastFrameTime: performance.now(),
        };

        // Track Long Tasks
        if (typeof PerformanceObserver !== 'undefined') {
          try {
            const ltObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                window.__profiler.longTasks.push({
                  duration: entry.duration,
                  startTime: entry.startTime,
                  name: entry.name,
                });
              }
            });
            ltObserver.observe({ entryTypes: ['longtask'] });
          } catch (e) {}

          // Track Layout Shifts
          try {
            const lsObserver = new PerformanceObserver((list) => {
              for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                  window.__profiler.layoutShifts.push({
                    value: entry.value,
                    startTime: entry.startTime,
                  });
                }
              }
            });
            lsObserver.observe({ type: 'layout-shift', buffered: true });
          } catch (e) {}
        }

        // Frame timing loop
        function onFrame(now) {
          const delta = now - window.__profiler.lastFrameTime;
          window.__profiler.lastFrameTime = now;
          window.__profiler.frames.push({
            timestamp: now - window.__profiler.startTime,
            duration: delta,
          });
          if (window.__profiler.running) {
            window.__profiler.rafId = requestAnimationFrame(onFrame);
          }
        }
        window.__profiler.rafId = requestAnimationFrame(onFrame);
        return true;
      })()`,
      returnByValue: true,
    })

    // Perform synthetic scroll gesture downwards
    const totalScrollSteps = 25
    const stepDistance = 220
    console.log(`  - Simulating continuous scroll gestures (${totalScrollSteps} steps of ${stepDistance}px)...`)

    for (let i = 0; i < totalScrollSteps; i++) {
      await cdp.send('Input.synthesizeScrollGesture', {
        x: 500,
        y: 400,
        yDistance: -stepDistance,
        speed: 1200,
        gestureSourceType: 'touch',
      })
      await sleep(100)
    }

    // Wait a brief settling moment
    await sleep(800)

    // Stop profiler and extract metrics
    const metricsRes = await cdp.send('Runtime.evaluate', {
      expression: `(() => {
        window.__profiler.running = false;
        if (window.__profiler.rafId) cancelAnimationFrame(window.__profiler.rafId);
        
        const durations = window.__profiler.frames.map(f => f.duration).slice(2);
        durations.sort((a, b) => a - b);

        const totalFrames = durations.length;
        const totalDuration = durations.reduce((a, b) => a + b, 0);
        const avgFrameTime = totalDuration / totalFrames;
        const avgFps = totalFrames > 0 ? (1000 / avgFrameTime) : 0;
        
        const p50 = durations[Math.floor(totalFrames * 0.50)] || 0;
        const p90 = durations[Math.floor(totalFrames * 0.90)] || 0;
        const p95 = durations[Math.floor(totalFrames * 0.95)] || 0;
        const p99 = durations[Math.floor(totalFrames * 0.99)] || 0;
        const max = durations[totalFrames - 1] || 0;

        const droppedFrames_18ms = durations.filter(d => d > 18).length;
        const droppedFrames_33ms = durations.filter(d => d > 33.3).length;
        const droppedFrames_50ms = durations.filter(d => d > 50).length;
        const freezeFrames_100ms = durations.filter(d => d > 100).length;
        const freezeFrames_250ms = durations.filter(d => d > 250).length;

        const initialFrames = window.__profiler.frames.filter(f => f.timestamp <= 800);
        const maxInitialFreeze = Math.max(0, ...initialFrames.map(f => f.duration));

        return {
          totalFrames,
          avgFps: Math.round(avgFps * 10) / 10,
          avgFrameTime: Math.round(avgFrameTime * 100) / 100,
          p50: Math.round(p50 * 100) / 100,
          p90: Math.round(p90 * 100) / 100,
          p95: Math.round(p95 * 100) / 100,
          p99: Math.round(p99 * 100) / 100,
          maxFrameTime: Math.round(max * 100) / 100,
          jankMetrics: {
            dropped_gt_18ms: droppedFrames_18ms,
            dropped_gt_33ms: droppedFrames_33ms,
            dropped_gt_50ms: droppedFrames_50ms,
            freeze_gt_100ms: freezeFrames_100ms,
            freeze_gt_250ms: freezeFrames_250ms,
            maxInitialFreezeMs: Math.round(maxInitialFreeze * 100) / 100,
          },
          longTasks: window.__profiler.longTasks,
          layoutShiftsCount: window.__profiler.layoutShifts.length,
          totalLayoutShiftScore: window.__profiler.layoutShifts.reduce((s, x) => s + x.value, 0),
        };
      })()`,
      returnByValue: true,
    })

    const data = metricsRes.value
    console.log(`  📊 Results:`)
    console.log(`     • Average FPS: ${data.avgFps} fps`)
    console.log(`     • Avg Frame Time: ${data.avgFrameTime} ms`)
    console.log(`     • 95th Percentile Frame Time: ${data.p95} ms`)
    console.log(`     • 99th Percentile Frame Time: ${data.p99} ms`)
    console.log(`     • Max Frame Duration (Worst Jank): ${data.maxFrameTime} ms`)
    console.log(`     • Initial Scroll Max Freeze: ${data.jankMetrics.maxInitialFreezeMs} ms`)
    console.log(`     • Frames > 33.3ms (FPS < 30): ${data.jankMetrics.dropped_gt_33ms} (${Math.round((data.jankMetrics.dropped_gt_33ms / data.totalFrames) * 100)}%)`)
    console.log(`     • Frames > 50ms (FPS < 20): ${data.jankMetrics.dropped_gt_50ms}`)
    console.log(`     • Stalls > 100ms (Noticeable freeze): ${data.jankMetrics.freeze_gt_100ms}`)
    console.log(`     • Stalls > 250ms (Quarter-second stall): ${data.jankMetrics.freeze_gt_250ms}`)
    console.log(`     • Long Tasks Detected: ${data.longTasks.length} (Max: ${Math.max(0, ...data.longTasks.map(t => Math.round(t.duration)))} ms)`)
    console.log(`     • Total Layout Shift Score (CLS): ${data.totalLayoutShiftScore.toFixed(4)}`)

    return data
  }

  try {
    const baselineResults = await runScrollBenchmark({
      label: '1. Modern Machine Baseline (1x CPU)',
      cpuThrottleRate: 1,
    })

    const throttledResults = await runScrollBenchmark({
      label: '2. Emulated 2020 MacBook Pro / Older Laptop (4x CPU Throttling)',
      cpuThrottleRate: 4,
    })

    const report = {
      timestamp: new Date().toISOString(),
      url: TARGET_URL,
      baseline: baselineResults,
      throttled2020MacBook: throttledResults,
    }

    writeFileSync('profile-report.json', JSON.stringify(report, null, 2))
    console.log(`\n✅ Profile report written to profile-report.json`)
  } finally {
    cdp.close()
    chromeProc.kill()
  }
}

runProfilingSuite().catch((err) => {
  console.error('Profiling error:', err)
  process.exit(1)
})
