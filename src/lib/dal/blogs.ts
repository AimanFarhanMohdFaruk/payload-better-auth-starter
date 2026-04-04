import 'server-only'

import { getPayload } from '@/lib/payload/get-payload'

import type { Blog } from '@/payload-types'

export type ListBlogPostsParams = {
  category?: Blog['category']
  page?: number
  limit?: number
}

/**
 * Server-only blog listing used by RSC and by `/api/blogs`.
 */
export async function listBlogPosts({ category, page = 1, limit = 12 }: ListBlogPostsParams) {
  const payload = await getPayload()

  return payload.find({
    collection: 'blog',
    depth: 1,
    limit,
    page,
    select: {
      title: true,
      slug: true,
      category: true,
      publishedAt: true,
      authors: true,
      meta: true,
    },
    where: category
      ? {
          category: {
            equals: category,
          },
        }
      : undefined,
  })
}
