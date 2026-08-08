import { forwardRef, type ComponentPropsWithoutRef, type ReactElement } from 'react'

import { cn } from '@/lib/utils'

export interface VimeoPlayerOptions {
	autopause?: boolean
	autoplay?: boolean
	background?: boolean
	byline?: boolean
	color?: string
	controls?: boolean
	dnt?: boolean
	keyboard?: boolean
	loop?: boolean
	muted?: boolean
	pip?: boolean
	playsinline?: boolean
	portrait?: boolean
	quality?: '240p' | '360p' | '540p' | '720p' | '1080p' | '2k' | '4k' | 'auto'
	speed?: boolean
	texttrack?: string
	title?: boolean
}

export interface VimeoSourceProps {
	privacyHash?: string
	videoId: string
}

export interface VimeoEmbedProps
	extends VimeoSourceProps, Omit<ComponentPropsWithoutRef<'iframe'>, 'src' | 'srcDoc' | 'title'> {
	playerOptions?: VimeoPlayerOptions
	title: string
}

function buildVimeoUrl({
	playerOptions,
	privacyHash,
	videoId,
}: VimeoSourceProps & Pick<VimeoEmbedProps, 'playerOptions'>): string {
	const url = new URL(`https://player.vimeo.com/video/${encodeURIComponent(videoId)}`)

	if (privacyHash) url.searchParams.set('h', privacyHash)

	for (const [option, value] of Object.entries(playerOptions ?? {})) {
		if (value !== undefined) {
			url.searchParams.set(option, typeof value === 'boolean' ? (value ? '1' : '0') : value)
		}
	}

	return url.toString()
}

export const VimeoEmbed = forwardRef<HTMLIFrameElement, VimeoEmbedProps>(function VimeoEmbed(
	{
		allow = 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share',
		allowFullScreen = true,
		className,
		loading = 'lazy',
		playerOptions,
		privacyHash,
		referrerPolicy = 'strict-origin-when-cross-origin',
		sandbox = 'allow-scripts allow-same-origin allow-presentation allow-popups',
		title,
		videoId,
		...props
	},
	ref,
): ReactElement {
	return (
		<iframe
			{...props}
			ref={ref}
			allow={allow}
			allowFullScreen={allowFullScreen}
			className={cn('aspect-video w-full border-0', className)}
			data-slot="vimeo-embed"
			loading={loading}
			referrerPolicy={referrerPolicy}
			sandbox={sandbox}
			src={buildVimeoUrl({ playerOptions, privacyHash, videoId })}
			title={title}
		/>
	)
})
