'use client'

import type React from 'react'

import { FormFieldError } from '@/components/form/components/form-field-error'
import { useFieldContext } from '@/components/form/hooks/form-context'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import {
	Select as SelectComponent,
	SelectItem,
	SelectPopup,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'

export const Select: React.FC<
	SelectField & {
		description?: string
		placeholder?: string
		width: string
	}
> = ({ label, options, width, description, placeholder }) => {
	const field = useFieldContext<string>()

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	const selected = options.find((option) => option.value === field.state.value) ?? null

	return (
		<Width width={width}>
			<Field invalid={isInvalid} name={field.name}>
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				<SelectComponent
					items={options}
					itemToStringValue={(option) => option.value}
					name={field.name}
					value={selected}
					onValueChange={(option) => field.handleChange(option?.value ?? '')}
				>
					<SelectTrigger id={field.name} aria-invalid={isInvalid}>
						<SelectValue placeholder={placeholder || 'Select...'} />
					</SelectTrigger>
					<SelectPopup>
						{options.map((option) => (
							<SelectItem key={option.value} value={option}>
								{option.label}
							</SelectItem>
						))}
					</SelectPopup>
				</SelectComponent>
				{isInvalid && <FormFieldError errors={field.state.meta.errors} />}
				{description && <FieldDescription>{description}</FieldDescription>}
			</Field>
		</Width>
	)
}
