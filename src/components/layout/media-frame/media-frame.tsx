'use client'

import { mergeProps } from '@base-ui/react/merge-props'
import { useRender } from '@base-ui/react/use-render'
import { forwardRef, type ReactElement } from 'react'

import { cn } from '@/lib/utils'

export type MediaFrameRootProps = useRender.ComponentProps<'figure'>
export type MediaFrameContentProps = useRender.ComponentProps<'div'>
export type MediaFrameOverlayProps = useRender.ComponentProps<'div'>
export type MediaFrameCaptionProps = useRender.ComponentProps<'figcaption'>

export const MediaFrameRoot = forwardRef<HTMLElement, MediaFrameRootProps>(function MediaFrameRoot(
	{ className, render, ...props },
	ref,
): ReactElement {
	const defaultProps = {
		className: cn('relative', className),
		'data-slot': 'media-frame',
	}

	return useRender({
		defaultTagName: 'figure',
		props: mergeProps<'figure'>(defaultProps, props),
		ref,
		render,
	})
})

export const MediaFrameContent = forwardRef<HTMLDivElement, MediaFrameContentProps>(
	function MediaFrameContent({ className, render, ...props }, ref): ReactElement {
		const defaultProps = {
			className: cn('relative', className),
			'data-slot': 'media-frame-content',
		}

		return useRender({
			defaultTagName: 'div',
			props: mergeProps<'div'>(defaultProps, props),
			ref,
			render,
		})
	},
)

export const MediaFrameOverlay = forwardRef<HTMLDivElement, MediaFrameOverlayProps>(
	function MediaFrameOverlay({ className, render, ...props }, ref): ReactElement {
		const defaultProps = {
			className: cn('pointer-events-none absolute inset-0', className),
			'data-slot': 'media-frame-overlay',
		}

		return useRender({
			defaultTagName: 'div',
			props: mergeProps<'div'>(defaultProps, props),
			ref,
			render,
		})
	},
)

export const MediaFrameCaption = forwardRef<HTMLElement, MediaFrameCaptionProps>(
	function MediaFrameCaption({ className, render, ...props }, ref): ReactElement {
		const defaultProps = {
			className: cn('mt-3 text-muted-foreground text-sm', className),
			'data-slot': 'media-frame-caption',
		}

		return useRender({
			defaultTagName: 'figcaption',
			props: mergeProps<'figcaption'>(defaultProps, props),
			ref,
			render,
		})
	},
)
