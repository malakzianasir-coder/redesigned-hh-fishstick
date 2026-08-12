import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";
import { getGuestUserInfo } from "@/lib/feedback/guestUser";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

const FEEDBACK_ROOM_PREFIX = "hijaz";
const PUBLIC_ROOM_ACCESSES = ["*:write"] as const;

function isFeedbackRoom(room: unknown): room is string {
  return typeof room === "string" && room.startsWith(FEEDBACK_ROOM_PREFIX);
}

function getUserId(rawUserId: unknown): string {
  if (typeof rawUserId === "string" && rawUserId.startsWith("guest-")) {
    return rawUserId.slice(0, 64);
  }

  return `guest-reviewer-${Math.floor(Math.random() * 10000)}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const userId = getUserId(body?.userId);
    const userInfo = getGuestUserInfo(userId);

    const session = liveblocks.prepareSession(userId, {
      userInfo,
    });

    if (isFeedbackRoom(body?.room)) {
      await liveblocks.upsertRoom(body.room, {
        update: {
          defaultAccesses: [...PUBLIC_ROOM_ACCESSES],
        },
        create: {
          defaultAccesses: [...PUBLIC_ROOM_ACCESSES],
        },
      });

      session.allow(body.room, session.FULL_ACCESS);
    }

    const { status, body: responseBody } = await session.authorize();
    return new NextResponse(responseBody, { status });
  } catch (error) {
    console.error("Liveblocks Auth Error:", error);
    return new NextResponse("Authentication failed", { status: 500 });
  }
}
