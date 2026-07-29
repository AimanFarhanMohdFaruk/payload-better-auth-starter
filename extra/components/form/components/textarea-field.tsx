'use client'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

import { useFieldContext } from '../hooks/form-context'
import { FormFieldError } from './form-field-error'

export default function TextareaField({
	label,
	description,
	...textareaProps
}: {
	label: string
	description?: string
} & Omit<React.ComponentProps<typeof Textarea>, 'id' | 'name' | 'value' | 'onBlur' | 'onChange'>) {
	const field = useFieldContext<string>()

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	return (
		<Field invalid={isInvalid} name={field.name}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Textarea
				{...textareaProps}
				id={field.name}
				name={field.name}
				value={field.state.value}
				onBlur={field.handleBlur}
				onChange={(e) => field.handleChange(e.target.value)}
				aria-invalid={isInvalid}
			/>
			{isInvalid && <FormFieldError errors={field.state.meta.errors} />}
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	)
}
