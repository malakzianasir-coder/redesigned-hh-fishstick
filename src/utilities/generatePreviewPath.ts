import { PayloadRequest, CollectionSlug } from 'payload'

const collectionPrefixMap = {
  'landing-pages': '/lp',
  posts: '/posts',
  pages: '',
} as const satisfies Partial<Record<CollectionSlug, string>>

type PreviewCollection = keyof typeof collectionPrefixMap

type Props = {
  collection: PreviewCollection
  slug: string
  req: PayloadRequest
}

export const generatePreviewPath = ({ collection, slug }: Props) => {
  const encodedParams = new URLSearchParams({
    slug,
    collection,
    path: `${collectionPrefixMap[collection]}/${slug}`,
    previewSecret: process.env.PREVIEW_SECRET || '',
  })

  const url = `/next/preview?${encodedParams.toString()}`

  return url
}
