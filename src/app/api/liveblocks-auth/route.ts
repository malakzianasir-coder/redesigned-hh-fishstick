import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

const FEEDBACK_ROOM_PREFIX = "hijaz";

function isFeedbackRoom(room: unknown): room is string {
  return typeof room === "string" && room.startsWith(FEEDBACK_ROOM_PREFIX);
}

export async function POST(request: Request) {
  const dummyUser = {
    id: "guest-reviewer-" + Math.floor(Math.random() * 10000),
    info: {
      name: "Guest Reviewer",
      avatar: "https://liveblocks.io/avatars/avatar-4.png",
      color: "#0070f3",
    },
  };

  try {
    const session = liveblocks.prepareSession(dummyUser.id, {
      userInfo: dummyUser.info,
    });

    const { room } = await request.json();

    if (isFeedbackRoom(room)) {
      session.allow(room, session.FULL_ACCESS);
    }

    const { status, body } = await session.authorize();
    return new NextResponse(body, { status });
  } catch (error) {
    console.error("Liveblocks Auth Error:", error);
    return new NextResponse("Authentication failed", { status: 500 });
  }
}
