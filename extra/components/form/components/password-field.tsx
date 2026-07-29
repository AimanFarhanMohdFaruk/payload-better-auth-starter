'use client'

import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

import { useFieldContext } from '../hooks/form-context'
import { FormFieldError } from './form-field-error'

export default function PasswordField({
	label,
	description,
	enableToggle = true,
	...inputProps
}: {
	label: string
	description?: string
	enableToggle?: boolean
} & Omit<
	React.ComponentProps<typeof InputGroupInput>,
	'id' | 'name' | 'value' | 'onBlur' | 'onChange'
>) {
	const field = useFieldContext<string>()
	const [visible, setVisible] = useState(false)

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	return (
		<Field invalid={isInvalid} name={field.name}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<InputGroup>
				<InputGroupInput
					{...inputProps}
					id={field.name}
					name={field.name}
					value={field.state.value}
					onBlur={field.handleBlur}
					onChange={(e) => field.handleChange(e.target.value)}
					aria-invalid={isInvalid}
					type={visible ? 'text' : 'password'}
				/>
				{enableToggle && (
					<InputGroupAddon align="inline-end">
						<Button
							aria-label={visible ? 'Hide password' : 'Show password'}
							onClick={() => setVisible((current) => !current)}
							size="icon-xs"
							type="button"
							variant="ghost"
						>
							{visible ? <EyeOffIcon aria-hidden="true" /> : <EyeIcon aria-hidden="true" />}
						</Button>
					</InputGroupAddon>
				)}
			</InputGroup>
			{isInvalid && <FormFieldError errors={field.state.meta.errors} />}
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	)
}
