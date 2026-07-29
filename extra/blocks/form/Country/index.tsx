'use client'

import type React from 'react'

import { FormFieldError } from '@/components/form/components/form-field-error'
import { useFieldContext } from '@/components/form/hooks/form-context'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/components/ui/select'

import type { CountryField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'
import { countryOptions } from './options'

export const Country: React.FC<
	CountryField & {
		width: string
		description?: string
	}
> = ({ label, width, description }) => {
	const field = useFieldContext<string>()

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	const selected = countryOptions.find((option) => option.value === field.state.value) ?? null

	return (
		<Width width={width}>
			<Field invalid={isInvalid} name={field.name}>
				<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
				<Select
					name={field.name}
					value={selected}
					onValueChange={(option) => field.handleChange(option?.value ?? '')}
					items={countryOptions}
					itemToStringValue={(option) => option.value}
				>
					<SelectTrigger id={field.name} aria-invalid={isInvalid}>
						<SelectValue placeholder="Select a country" />
					</SelectTrigger>
					<SelectPopup>
						{countryOptions.map((option) => (
							<SelectItem key={option.value} value={option}>
								{option.label}
							</SelectItem>
						))}
					</SelectPopup>
				</Select>
				{isInvalid && <FormFieldError errors={field.state.meta.errors} />}
				{description && <FieldDescription>{description}</FieldDescription>}
			</Field>
		</Width>
	)
}
