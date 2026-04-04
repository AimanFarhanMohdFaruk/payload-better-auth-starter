import type { PaginatedDocs } from 'payload'
import type { Blog } from '@/payload-types'
import { apiFetch } from './http'

export type BlogListResponse = PaginatedDocs<Blog>

export const blogsQueryKey = {
  all: ['blog'] as const,
  list: (params: { category?: string; page: number }) =>
    [...blogsQueryKey.all, 'list', params] as const,
}

export type FetchBlogPostsParams = {
  category?: string
  page?: number
}

function buildBlogListSearchParams(params: FetchBlogPostsParams): string {
  const search = new URLSearchParams()
  if (params.page != null && params.page > 1) {
    search.set('page', String(params.page))
  }
  if (params.category) {
    search.set('category', params.category)
  }
  const qs = search.toString()
  return qs ? `?${qs}` : ''
}

export async function fetchBlogPosts(params: FetchBlogPostsParams = {}): Promise<BlogListResponse> {
  const path = `/api/blogs${buildBlogListSearchParams(params)}`
  return apiFetch<BlogListResponse>(path)
}
