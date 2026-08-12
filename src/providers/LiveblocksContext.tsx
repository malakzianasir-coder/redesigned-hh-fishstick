"use client"

import { ReactNode, useMemo } from "react"
import { usePathname } from "next/navigation"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense"
import { getGuestUserId } from "@/lib/feedback/guestUser"

function getRoomId(pathname: string | null) {
  return pathname && pathname !== "/" ? `hijaz${pathname.replace(/\//g, "-")}` : "hijaz-home"
}

export function LiveblocksContext({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const roomId = useMemo(() => getRoomId(pathname), [pathname])

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async (room) => {
        const response = await fetch("/api/liveblocks-auth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room,
            userId: getGuestUserId(),
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to authenticate Liveblocks session")
        }

        return await response.json()
      }}
    >
      <RoomProvider id={roomId} initialPresence={{ cursor: null }}>
        <ClientSideSuspense fallback={<>{children}</>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
