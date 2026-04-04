import { BLOG_CATEGORIES, type BlogCategory, isValidCategory } from '@/lib/blog/categories'

import { createSearchParamsCache, parseAsInteger, parseAsString } from 'nuqs/server'

export { BLOG_CATEGORIES, type BlogCategory, isValidCategory }

// Search params parsers for blog filtering and pagination
export const blogSearchParams = {
  category: parseAsString.withDefault(''),
  page: parseAsInteger.withDefault(1),
}

// Create search params cache for server-side usage
export const blogSearchParamsCache = createSearchParamsCache(blogSearchParams)
