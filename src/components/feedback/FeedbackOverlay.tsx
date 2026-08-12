"use client"

import React, { useState, useEffect } from "react"
import { useThreads, ClientSideSuspense } from "@liveblocks/react/suspense"
import { Composer, Thread } from "@liveblocks/react-ui"
import "@liveblocks/react-ui/styles.css"
import { FeedbackPortal } from "@/components/feedback/FeedbackPortal"

// Helper to generate a readable CSS selector for developers
function getElementSelector(el: HTMLElement | null): string {
  if (!el) return ""
  const path: string[] = []
  let current = el

  while (current && current.nodeType === Node.ELEMENT_NODE && current.tagName.toLowerCase() !== 'html') {
    let selector = current.tagName.toLowerCase()
    
    if (current.id) {
      selector += `#${current.id}`
      path.unshift(selector)
      break // IDs are usually unique, stop walking up
    } else {
      // Calculate nth-of-type if necessary
      let sibling = current.previousElementSibling
      let nth = 1
      while (sibling) {
        if (sibling.tagName === current.tagName) nth++
        sibling = sibling.previousElementSibling
      }
      if (nth > 1) selector += `:nth-of-type(${nth})`
      
      // Add a class for readability (pick the first non-Tailwind-variant class if possible)
      if (current.className && typeof current.className === 'string') {
        const classes = current.className.trim().split(/\s+/).filter(c => c && !c.includes(':'))
        if (classes.length > 0) {
          selector += `.${classes[0]}`
        }
      }
    }
    
    path.unshift(selector)
    current = current.parentElement as HTMLElement
  }
  
  // Truncate if it's absurdly long
  const fullPath = path.join(' > ')
  return fullPath.length > 100 ? '...' + fullPath.slice(-100) : fullPath
}

// Helper to get meaningful text from an element
function getElementText(el: HTMLElement): string {
  if (el.tagName.toLowerCase() === 'img') return `[Image: ${(el as HTMLImageElement).alt || 'No alt text'}]`
  if (el.tagName.toLowerCase() === 'svg') return '[Icon/SVG]'
  
  const text = (el.innerText || el.textContent || '').trim()
  if (!text) return '[Empty Element]'
  return text.length > 50 ? text.substring(0, 50) + '...' : text
}

function FeedbackOverlayInner() {
  const [isCommentingMode, setIsCommentingMode] = useState(false)
  const { threads } = useThreads()
  const [newCommentData, setNewCommentData] = useState<{ 
    x: number; y: number; 
    selector: string; text: string;
    windowWidth: number; windowHeight: number;
    url: string; userAgent: string;
  } | null>(null)
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null)

  // Global click listener for capture phase
  useEffect(() => {
    if (!isCommentingMode) return

    const handleGlobalClick = (e: MouseEvent) => {
      // We don't want to capture clicks on our own UI (the toggle button or existing modals)
      const target = e.target as HTMLElement
      if (target.closest('.liveblocks-feedback-ui')) return

      e.preventDefault()
      e.stopPropagation()

      const selector = getElementSelector(target)
      const text = getElementText(target)

      setNewCommentData({
        x: e.pageX,
        y: e.pageY,
        selector,
        text,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        url: window.location.pathname,
        userAgent: navigator.userAgent
      })
      setIsCommentingMode(false)
      setActiveThreadId(null)
    }

    // Use capture phase (true) to intercept the event BEFORE anything else (like links) handles it
    document.addEventListener('click', handleGlobalClick, true)

    return () => {
      document.removeEventListener('click', handleGlobalClick, true)
    }
  }, [isCommentingMode])

  return (
    <>
      {/* Global CSS to change cursor during commenting mode */}
      {isCommentingMode && (
        <style dangerouslySetInnerHTML={{ __html: `
          body * { cursor: crosshair !important; }
          .liveblocks-feedback-ui, .liveblocks-feedback-ui * { cursor: default !important; }
        `}} />
      )}

      {/* Helpful Toast Message */}
      {isCommentingMode && (
        <div className="liveblocks-feedback-ui fixed bottom-24 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-2xl z-[100] border-2 border-primary-blue/20">
          <span className="text-primary-blue font-semibold">Click any specific element to drop a pin.</span>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          setIsCommentingMode(!isCommentingMode)
          setNewCommentData(null)
          setActiveThreadId(null)
        }}
        className={`liveblocks-feedback-ui fixed top-1/2 right-4 -translate-y-1/2 z-[100] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 ${
          isCommentingMode ? "bg-primary-red text-white" : "bg-primary-blue text-white"
        }`}
        title={isCommentingMode ? "Cancel Commenting" : "Drop a Pin"}
      >
        {isCommentingMode ? (
          <span className="text-2xl font-light leading-none">&times;</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
        )}
      </button>

      {/* Existing Comment Pins */}
      <FeedbackPortal>
      {threads.map((thread) => {
        if (!thread.metadata || typeof thread.metadata.x !== 'number') return null;

        return (
          <div 
            key={thread.id} 
            className="liveblocks-feedback-ui pointer-events-auto absolute z-[90]"
            style={{ 
              left: `${thread.metadata.x}px`, 
              top: `${thread.metadata.y}px`,
            }}
          >
            {/* The Pin */}
            <button 
              onClick={(e) => {
                e.stopPropagation()
                setActiveThreadId(activeThreadId === thread.id ? null : thread.id)
                setNewCommentData(null)
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-red text-white shadow-lg border-[3px] border-white hover:scale-110 transition-transform"
            >
              <span className="text-xs font-bold leading-none">{thread.comments.length}</span>
            </button>

            {/* The Open Thread Modal */}
            {activeThreadId === thread.id && (
              <div 
                className="absolute top-6 left-1/2 -translate-x-1/2 w-[350px] bg-white rounded-xl shadow-2xl p-2 z-[100]"
                onClick={(e) => e.stopPropagation()}
              >
                 <div className="flex justify-between items-center mb-2 px-2 pt-1 border-b pb-2">
                   <span className="text-xs font-semibold text-gray-500 uppercase">Thread</span>
                   <button onClick={() => setActiveThreadId(null)} className="text-gray-400 hover:text-gray-700 font-bold">&times;</button>
                 </div>
                 
                 {/* Metadata Context Display */}
                 <div className="mb-2 rounded bg-gray-50 p-2 border border-gray-100 text-xs flex flex-col gap-2">
                   {(thread.metadata.elementSelector || thread.metadata.elementText) && (
                     <div>
                       <p className="font-bold text-gray-700">📍 Element Context</p>
                       {thread.metadata.elementText && (
                         <p className="text-gray-600 italic mt-0.5">&quot;{thread.metadata.elementText}&quot;</p>
                       )}
                       {thread.metadata.elementSelector && (
                         <code className="text-[10px] text-primary-blue break-all mt-1 block font-mono bg-blue-50/50 p-1 rounded">
                           {String(thread.metadata.elementSelector)}
                         </code>
                       )}
                     </div>
                   )}
                   
                   {(thread.metadata.windowWidth || thread.metadata.url || thread.metadata.userAgent) && (
                     <div className="pt-2 border-t border-gray-200 grid grid-cols-2 gap-x-2 gap-y-1 mt-1 text-[10px] text-gray-500">
                       {thread.metadata.windowWidth && thread.metadata.windowHeight && (
                         <p><strong className="text-gray-700">Screen:</strong> {thread.metadata.windowWidth}x{thread.metadata.windowHeight}</p>
                       )}
                       {thread.metadata.url && (
                         <p><strong className="text-gray-700">Path:</strong> {String(thread.metadata.url)}</p>
                       )}
                       {thread.metadata.userAgent && (
                         <p className="col-span-2 truncate" title={String(thread.metadata.userAgent)}>
                           <strong className="text-gray-700">Client:</strong> {String(thread.metadata.userAgent).includes("Mac") ? "Mac OS" : "Windows"} / {String(thread.metadata.userAgent).includes("Chrome") ? "Chrome" : String(thread.metadata.userAgent).includes("Firefox") ? "Firefox" : "Safari/Other"}
                         </p>
                       )}
                     </div>
                   )}
                 </div>

                 <div className="max-h-[400px] overflow-y-auto">
                   <Thread thread={thread} className="!border-none !shadow-none" />
                 </div>
              </div>
            )}
          </div>
        )
      })}
      </FeedbackPortal>

      {/* New Comment Composer */}
      <FeedbackPortal>
      {newCommentData && (
        <div 
          className="liveblocks-feedback-ui pointer-events-auto absolute z-[100] w-[350px] bg-white rounded-xl shadow-2xl p-2"
          style={{ 
            left: `${newCommentData.x}px`, 
            top: `${newCommentData.y}px`,
            transform: "translate(-50%, 15px)"
          }}
        >
          <div className="flex justify-between items-center mb-2 px-2 pt-1 border-b pb-2">
            <span className="text-xs font-semibold text-gray-500 uppercase">New Comment</span>
            <button onClick={() => setNewCommentData(null)} className="text-gray-400 hover:text-gray-700 font-bold">&times;</button>
          </div>

          <div className="mb-2 rounded bg-gray-50 p-2 border border-gray-100 text-[10px]">
             <p className="font-bold text-gray-700 text-xs mb-1">📍 Target Element</p>
             <p className="text-gray-600 italic">&quot;{newCommentData.text}&quot;</p>
             
             <div className="pt-2 mt-2 border-t border-gray-200 grid grid-cols-2 gap-1 text-gray-500">
               <p><strong className="text-gray-700">Screen:</strong> {newCommentData.windowWidth}x{newCommentData.windowHeight}</p>
               <p><strong className="text-gray-700">Path:</strong> {newCommentData.url}</p>
             </div>
          </div>

          <div 
            onKeyDownCapture={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                setTimeout(() => setNewCommentData(null), 100);
              }
            }}
          >
            <Composer 
              metadata={{ 
                x: newCommentData.x, 
                y: newCommentData.y,
                elementSelector: newCommentData.selector,
                elementText: newCommentData.text,
                windowWidth: newCommentData.windowWidth,
                windowHeight: newCommentData.windowHeight,
                url: newCommentData.url,
                userAgent: newCommentData.userAgent
              }} 
              className="!shadow-none"
            />
          </div>
        </div>
      )}
      </FeedbackPortal>
    </>
  )
}

export function FeedbackOverlay() {
  return (
    <ClientSideSuspense fallback={null}>
      <FeedbackOverlayInner />
    </ClientSideSuspense>
  )
}
