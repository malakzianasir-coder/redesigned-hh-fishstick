"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense"

export function LiveblocksContext({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  
  // Create a unique room ID for every page route, fallback to "home"
  const roomId = pathname && pathname !== "/" ? `hijaz${pathname.replace(/\//g, "-")}` : "hijaz-home"

  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<>{children}</>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  )
}
