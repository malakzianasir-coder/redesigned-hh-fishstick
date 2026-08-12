"use client"

import { useEffect } from "react"
import { useOthers, useUpdateMyPresence, ClientSideSuspense } from "@liveblocks/react/suspense"

type CursorProps = {
  x: number
  y: number
  name: string
  color: string
}

function Cursor({ x, y, name, color }: CursorProps) {
  return (
    <div
      className="liveblocks-feedback-ui pointer-events-none fixed z-[95]"
      style={{ left: x, top: y }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        className="-translate-x-0.5 -translate-y-0.5 drop-shadow"
        aria-hidden="true"
      >
        <path
          d="M5 3L19 12L11 13L8 21L5 3Z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
        />
      </svg>
      <span
        className="absolute left-4 top-3 rounded px-1.5 py-0.5 text-[11px] font-semibold leading-none text-white whitespace-nowrap"
        style={{ backgroundColor: color }}
      >
        {name}
      </span>
    </div>
  )
}

function MultiplayerCursorsInner() {
  const others = useOthers()
  const updateMyPresence = useUpdateMyPresence()

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      updateMyPresence({
        cursor: { x: event.clientX, y: event.clientY },
      })
    }

    const handlePointerLeave = () => {
      updateMyPresence({ cursor: null })
    }

    window.addEventListener("pointermove", handlePointerMove)
    document.documentElement.addEventListener("pointerleave", handlePointerLeave)

    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave)
      updateMyPresence({ cursor: null })
    }
  }, [updateMyPresence])

  return (
    <>
      {others
        .filter((other) => other.presence.cursor !== null)
        .map(({ connectionId, presence, info }) => {
          const cursor = presence.cursor!
          return (
            <Cursor
              key={connectionId}
              x={cursor.x}
              y={cursor.y}
              name={info?.name ?? "Guest"}
              color={info?.color ?? "#0070f3"}
            />
          )
        })}
    </>
  )
}

export function MultiplayerCursors() {
  return (
    <ClientSideSuspense fallback={null}>
      <MultiplayerCursorsInner />
    </ClientSideSuspense>
  )
}
