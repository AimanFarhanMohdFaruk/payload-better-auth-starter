'use client'

import { useRender } from '@base-ui/react/use-render'
import { motion, type HTMLMotionProps, type Variants, useReducedMotion } from 'motion/react'
import { forwardRef, type ReactElement } from 'react'

export type EntranceEffect = 'reveal' | 'fade'

export interface EntranceProps extends Omit<
	HTMLMotionProps<'div'>,
	'animate' | 'initial' | 'ref' | 'variants' | 'viewport' | 'whileInView'
> {
	/** Selects the entrance treatment. */
	effect?: EntranceEffect
	/** Replaces viewport observation when supplied. */
	isActive?: boolean
	/** Plays the viewport-triggered animation only once. */
	once?: boolean
	/** Replaces the default element while preserving merged props and refs. */
	render?: useRender.RenderProp
	/** Overrides the selected effect's Motion variants. */
	variants?: Variants
	/** Overrides Motion's viewport options. */
	viewport?: HTMLMotionProps<'div'>['viewport']
}

export type EntranceRevealProps = Omit<EntranceProps, 'effect'>
export type EntranceFadeProps = Omit<EntranceProps, 'effect'>

type EntranceElementProps = useRender.ComponentProps<'div'>

const EntranceElement = forwardRef<HTMLDivElement, EntranceElementProps>(function EntranceElement(
	{ render, ...props },
	ref,
) {
	return useRender({
		defaultTagName: 'div',
		props,
		ref,
		render,
	})
})

const MotionEntranceElement = motion.create(EntranceElement)

const effectVariants: Record<EntranceEffect, Variants> = {
	reveal: {
		hidden: { filter: 'blur(6px)', opacity: 0, y: 16 },
		visible: { filter: 'blur(0px)', opacity: 1, y: 0 },
	},
	fade: {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
	},
}

const defaultTransition: NonNullable<EntranceProps['transition']> = {
	duration: 0.6,
	ease: [0.22, 1, 0.36, 1],
}

interface EntrancePrimitiveProps extends EntranceProps {
	effect: EntranceEffect
	slot: 'entrance-fade' | 'entrance-reveal'
}

const EntrancePrimitive = forwardRef<HTMLDivElement, EntrancePrimitiveProps>(
	function EntrancePrimitive(
		{
			effect,
			isActive,
			once = true,
			slot,
			transition = defaultTransition,
			variants = effectVariants[effect],
			viewport,
			...props
		},
		ref,
	) {
		const shouldReduceMotion = useReducedMotion()
		const isControlled = isActive !== undefined
		const animate = shouldReduceMotion
			? 'visible'
			: isControlled
				? isActive
					? 'visible'
					: 'hidden'
				: undefined

		return (
			<MotionEntranceElement
				{...props}
				ref={ref}
				animate={animate}
				data-slot={slot}
				initial={shouldReduceMotion ? false : 'hidden'}
				transition={shouldReduceMotion ? { duration: 0 } : transition}
				variants={variants}
				viewport={
					isControlled || shouldReduceMotion
						? undefined
						: { margin: '0px 0px -20% 0px', once, ...viewport }
				}
				whileInView={isControlled || shouldReduceMotion ? undefined : 'visible'}
			/>
		)
	},
)

export const EntranceReveal = forwardRef<HTMLDivElement, EntranceRevealProps>(
	function EntranceReveal(props, ref): ReactElement {
		return <EntrancePrimitive {...props} effect="reveal" ref={ref} slot="entrance-reveal" />
	},
)

export const EntranceFade = forwardRef<HTMLDivElement, EntranceFadeProps>(
	function EntranceFade(props, ref): ReactElement {
		return <EntrancePrimitive {...props} effect="fade" ref={ref} slot="entrance-fade" />
	},
)

const EntranceComponent = forwardRef<HTMLDivElement, EntranceProps>(function Entrance(
	{ effect = 'reveal', ...props },
	ref,
): ReactElement {
	return (
		<EntrancePrimitive
			{...props}
			effect={effect}
			ref={ref}
			slot={effect === 'fade' ? 'entrance-fade' : 'entrance-reveal'}
		/>
	)
})

export const Entrance = Object.assign(EntranceComponent, {
	Fade: EntranceFade,
	Reveal: EntranceReveal,
})
