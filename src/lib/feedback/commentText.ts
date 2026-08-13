import type { CommentBody } from '@liveblocks/node'
import { stringifyCommentBody } from '@liveblocks/node'

export async function getCommentPlainText(
  body: CommentBody | undefined,
): Promise<string | undefined> {
  if (!body) return undefined
  try {
    const text = await stringifyCommentBody(body, { format: 'plain' })
    return text.trim() || undefined
  } catch {
    return undefined
  }
}
