import { NextResponse } from 'next/server'

import { isValidCategory } from '@/lib/blog/categories'
import { listBlogPosts } from '@/lib/dal/blogs'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const pageRaw = searchParams.get('page')
  const page = Math.max(1, Number.parseInt(pageRaw ?? '1', 10) || 1)
  const categoryRaw = searchParams.get('category') ?? undefined
  const category = categoryRaw && isValidCategory(categoryRaw) ? categoryRaw : undefined

  try {
    const result = await listBlogPosts({ category, page, limit: 12 })
    return NextResponse.json(result)
  } catch (error) {
    console.error('[GET /api/blogs]', error)
    return NextResponse.json({ message: 'Failed to load blog posts' }, { status: 500 })
  }
}
