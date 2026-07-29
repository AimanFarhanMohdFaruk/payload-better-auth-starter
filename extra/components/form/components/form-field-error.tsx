import { FieldError } from '@/components/ui/field'

type ValidationError = { message?: string } | undefined

export function FormFieldError({ errors }: { errors: ValidationError[] }) {
	const messages = [...new Set(errors.flatMap((error) => (error?.message ? [error.message] : [])))]

	if (messages.length === 0) return null

	return (
		<FieldError>
			{messages.length === 1 ? (
				messages[0]
			) : (
				<ul className="ml-4 list-disc">
					{messages.map((message) => (
						<li key={message}>{message}</li>
					))}
				</ul>
			)}
		</FieldError>
	)
}
