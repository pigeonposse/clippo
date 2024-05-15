import type { TextOptions } from '@clack/prompts'

export type NumberOptions = TextOptions & {
	placeholder?: number
	defaultValue?: number
	errorText?: string
}
