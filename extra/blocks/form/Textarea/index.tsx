'use client'

import type React from 'react'

import { FormFieldError } from '@/components/form/components/form-field-error'
import { useFieldContext } from '@/components/form/hooks/form-context'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'

import type { TextField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'

export const Textarea: React.FC<
	TextField & {
		width: string
		label: string
		description?: string
		hidden?: boolean
	}
> = ({ label, required, width, description }) => {
	const field = useFieldContext<string>()

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	return (
		<Width width={width}>
			<Field invalid={isInvalid} name={field.name}>
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				<TextAreaComponent
					id={field.name}
					name={field.name}
					value={field.state.value}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
					aria-invalid={isInvalid}
					required={required}
					rows={3}
				/>
				{isInvalid && <FormFieldError errors={field.state.meta.errors} />}
				{description && <FieldDescription>{description}</FieldDescription>}
			</Field>
		</Width>
	)
}
