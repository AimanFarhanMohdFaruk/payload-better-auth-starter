'use client'

import type React from 'react'

import { FormFieldError } from '@/components/form/components/form-field-error'
import { useFieldContext } from '@/components/form/hooks/form-context'
import { Checkbox as CheckboxUI } from '@/components/ui/checkbox'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'

import type { CheckboxField } from '@payloadcms/plugin-form-builder/types'
import { Width } from '../Width'

export const Checkbox: React.FC<CheckboxField & { width: string; description?: string }> = ({
	label,
	required: requiredFromProps,
	width,
	description,
}) => {
	const field = useFieldContext<boolean | undefined>()

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	return (
		<Width width={width}>
			<Field invalid={isInvalid} name={field.name}>
				<FieldLabel htmlFor={field.name}>
					<CheckboxUI
						id={field.name}
						name={field.name}
						checked={field.state.value}
						onCheckedChange={(checked) => field.handleChange(checked)}
						aria-invalid={isInvalid}
						required={requiredFromProps}
					/>
					{label}
				</FieldLabel>
				{isInvalid && <FormFieldError errors={field.state.meta.errors} />}
				{description && <FieldDescription>{description}</FieldDescription>}
			</Field>
		</Width>
	)
}
