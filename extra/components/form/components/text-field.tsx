'use client'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

import { useFieldContext } from '../hooks/form-context'
import { FormFieldError } from './form-field-error'

export default function TextField({
	label,
	description,
	...inputProps
}: {
	label: string
	description?: string
} & Omit<React.ComponentProps<typeof Input>, 'id' | 'name' | 'value' | 'onBlur' | 'onChange'>) {
	const field = useFieldContext<string>()

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	return (
		<Field invalid={isInvalid} name={field.name}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				{...inputProps}
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
