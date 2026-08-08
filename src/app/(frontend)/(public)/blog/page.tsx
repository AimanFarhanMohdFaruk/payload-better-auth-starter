import type { Metadata } from 'next/types'
import { Suspense } from 'react'

import { Container, Section } from '@/components/layout'
import { Main } from '@/components/layout/main'
import { Entrance } from '@/components/motion-primitives'

import type { SearchParams } from 'nuqs/server'
import { BlogFilters, BlogFiltersSkeleton } from './blog-filters'
import { BlogPosts, BlogPostsSkeleton } from './blog-posts'
import { blogSearchParamsCache, isValidCategory } from './search-params'

type PageProps = {
	searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
	return (
		<Main className="my-0 px-0 md:px-0">
			<Section aria-labelledby="blog-title" spacing="lg">
				<Container>
					<Entrance>
						<Section.Header>
							<Section.Eyebrow>Blog</Section.Eyebrow>
							<Section.Title id="blog-title" render={<h1 />}>
								News, insights and more from Acme
							</Section.Title>
						</Section.Header>
					</Entrance>

					<Section.Content className="mt-10">
						<Suspense fallback={<BlogFiltersSkeleton />}>
							<BlogFilters />
						</Suspense>
						<Suspense fallback={<BlogPostsSkeleton />}>
							<BlogPosts searchParams={searchParams} />
						</Suspense>
					</Section.Content>
				</Container>
			</Section>
		</Main>
	)
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
	const { category, page } = await blogSearchParamsCache.parse(searchParams)

	let title = 'Acme Blog'

	if (category && isValidCategory(category)) {
		title = `Acme Blog - ${category.charAt(0).toUpperCase() + category.slice(1)}`
	}

	if (page > 1) {
		title += ` - Page ${page}`
	}

	return {
		title,
	}
}
