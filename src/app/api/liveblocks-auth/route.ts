import { Liveblocks } from "@liveblocks/node";
import { NextResponse } from "next/server";

// Using the secret key from environment variables
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: Request) {
  // We use a dummy guest user to allow anonymous feedback on the site
  const dummyUser = {
    id: "guest-reviewer-" + Math.floor(Math.random() * 10000), // Randomize ID slightly so multiple people testing won't conflict
    info: {
      name: "Guest Reviewer",
      avatar: "https://liveblocks.io/avatars/avatar-4.png",
      color: "#0070f3"
    },
  };

  try {
    const { status, body } = await liveblocks.identifyUser(
      {
        userId: dummyUser.id,
        groupIds: [], 
      },
      { userInfo: dummyUser.info }
    );

    return new NextResponse(body, { status });
  } catch (error) {
    console.error("Liveblocks Auth Error:", error);
    return new NextResponse("Authentication failed", { status: 500 });
  }
}
