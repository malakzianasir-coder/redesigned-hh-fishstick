import { Liveblocks } from '@liveblocks/node'
import { NextResponse } from 'next/server'
import { getCommentPlainText } from '@/lib/feedback/commentText'

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const threadId = String(body.threadId ?? '')
    const roomId = String(body.roomId ?? '')

    if (!threadId || !roomId) {
      return NextResponse.json({ error: 'threadId and roomId are required' }, { status: 400 })
    }

    const tasksUrl = process.env.HIJAZ_TASKS_URL
    const syncSecret = process.env.TASKS_SYNC_SECRET

    if (!tasksUrl || !syncSecret) {
      return NextResponse.json({ error: 'Task sync is not configured' }, { status: 503 })
    }

    const thread = await liveblocks.getThread({ roomId, threadId })

    const response = await fetch(`${tasksUrl.replace(/\/$/, '')}/api/tasks/from-thread`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-tasks-sync-secret': syncSecret,
      },
      body: JSON.stringify({
        threadId,
        roomId,
        metadata: thread.metadata,
        firstCommentBody: await getCommentPlainText(thread.comments[0]?.body),
        commentCount: thread.comments.length,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Task sync failed:', errorText)
      return NextResponse.json({ error: 'Failed to sync task' }, { status: 502 })
    }

    return NextResponse.json(await response.json())
  } catch (error) {
    console.error('POST /api/sync-liveblocks-thread', error)
    return NextResponse.json({ error: 'Sync failed' }, { status: 500 })
  }
}
