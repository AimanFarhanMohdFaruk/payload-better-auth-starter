'use client'

import { PhoneIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'

import { lookup } from 'country-data-list'
import parsePhoneNumber from 'libphonenumber-js'
import { CircleFlag } from 'react-circle-flags'
import { useFieldContext } from '../hooks/form-context'
import { FormFieldError } from './form-field-error'

export type CountryData = {
	alpha2: string
	alpha3: string
	countryCallingCodes: string[]
	currencies: string[]
	emoji?: string
	ioc: string
	languages: string[]
	name: string
	status: string
}

export default function PhoneField({
	label,
	description,
	placeholder = 'Enter phone number',
	defaultCountry,
	onCountryChange,
	...inputProps
}: {
	label: string
	description?: string
	placeholder?: string
	defaultCountry?: string
	onCountryChange?: (data: CountryData | undefined) => void
} & Omit<
	React.ComponentProps<typeof InputGroupInput>,
	'id' | 'name' | 'value' | 'onBlur' | 'onChange' | 'type'
>) {
	const field = useFieldContext<string>()
	const [displayFlag, setDisplayFlag] = useState<string>('')
	const [hasInitialized, setHasInitialized] = useState(false)

	const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
	const value = field.state.value

	// Initialize with default country
	useEffect(() => {
		if (defaultCountry) {
			const countryData = lookup.countries({
				alpha2: defaultCountry.toLowerCase(),
			})[0]
			setDisplayFlag(defaultCountry.toLowerCase())

			if (!hasInitialized && countryData?.countryCallingCodes?.[0] && !value) {
				field.handleChange(countryData.countryCallingCodes[0])
				setHasInitialized(true)
			}
		}
	}, [defaultCountry, value, hasInitialized, field])

	// Update flag when value changes externally
	useEffect(() => {
		if (value) {
			try {
				const parsed = parsePhoneNumber(value)
				if (parsed?.country) {
					setDisplayFlag(parsed.country.toLowerCase())
				}
			} catch {
				// Ignore parsing errors for partial input
			}
		}
	}, [value])

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newValue = e.target.value

		// Ensure the value starts with "+"
		if (!newValue.startsWith('+')) {
			if (newValue.startsWith('00')) {
				newValue = `+${newValue.slice(2)}`
			} else {
				newValue = `+${newValue}`
			}
		}

		try {
			const parsed = parsePhoneNumber(newValue)

			if (parsed?.country) {
				const countryCode = parsed.country
				setDisplayFlag(countryCode.toLowerCase())

				const countryInfo = lookup.countries({ alpha2: countryCode })[0]
				onCountryChange?.(countryInfo)

				field.handleChange(parsed.number)
			} else {
				field.handleChange(newValue)
				setDisplayFlag('')
				onCountryChange?.(undefined)
			}
		} catch {
			field.handleChange(newValue)
			setDisplayFlag('')
			onCountryChange?.(undefined)
		}
	}

	return (
		<Field invalid={isInvalid} name={field.name}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<InputGroup>
				<InputGroupInput
					{...inputProps}
					id={field.name}
					name={field.name}
					value={value}
					onBlur={field.handleBlur}
					onChange={handlePhoneChange}
					type="tel"
					autoComplete="tel"
					placeholder={placeholder}
					aria-invalid={isInvalid}
				/>
				<InputGroupAddon align="inline-start">
					<span aria-hidden="true">
						{displayFlag ? (
							<CircleFlag countryCode={displayFlag} height={16} className="size-4 rounded-full" />
						) : (
							<PhoneIcon />
						)}
					</span>
				</InputGroupAddon>
			</InputGroup>
			{isInvalid && <FormFieldError errors={field.state.meta.errors} />}
			{description && <FieldDescription>{description}</FieldDescription>}
		</Field>
	)
}
