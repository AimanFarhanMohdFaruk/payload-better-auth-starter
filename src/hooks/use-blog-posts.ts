'use client'

import { blogsQueryKey, type FetchBlogPostsParams, fetchBlogPosts } from '@/lib/api/blogs'

import { useQuery } from '@tanstack/react-query'

/**
 * Client-side blog list; uses `/api/blogs` and the same DAL as RSC.
 * Mutations: when you add admin flows, invalidate `blogsQueryKey.all` (or targeted list keys).
 */
export function useBlogPosts(params: FetchBlogPostsParams = {}) {
  const page = params.page ?? 1
  const category = params.category

  return useQuery({
    queryKey: blogsQueryKey.list({ category: category ?? '', page }),
    queryFn: () => fetchBlogPosts({ category, page }),
  })
}
