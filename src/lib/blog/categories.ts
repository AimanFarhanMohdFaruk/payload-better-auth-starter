import type { Blog } from '@/payload-types'

export const BLOG_CATEGORIES: NonNullable<Blog['category']>[] = [
  'company',
  'marketing',
  'newsroom',
  'partners',
  'engineering',
  'press',
] as const

export type BlogCategory = (typeof BLOG_CATEGORIES)[number]

export function isValidCategory(category: string | null | undefined): category is BlogCategory {
  return BLOG_CATEGORIES.includes(category as BlogCategory)
}
