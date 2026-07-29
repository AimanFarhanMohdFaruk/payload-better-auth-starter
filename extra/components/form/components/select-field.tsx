'use client'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from '@/components/ui/select'

import { useFieldContext } from '../hooks/form-context'
import { FormFieldError } from './form-field-error'

export type SelectOption = {
	label: string
	value: string
}

export default function SelectField({
	label,
	description,
	placeholder,
	options,
	...selectProps
}: {
	label: string
	description?: string
	placeholder?: string
	options: SelectOption[]
} & Omit<React.ComponentProps<typeof Select<SelectOption>>, 'value' | 'onValueChange' | 'items'>) {
	const field = useFieldContext<string>()

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	const selected = options.find((option) => option.value === field.state.value) ?? null

	return (
		<Field invalid={isInvalid} name={field.name}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Select<SelectOption>
				{...selectProps}
				items={options}
				itemToStringValue={(option) => option.value}
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
			</Select>
			{isInvalid && <FormFieldError errors={field.state.meta.errors} />}
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	)
}
