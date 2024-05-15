import chalk                         from 'chalk'
import gradientString                from 'gradient-string'
import { highlight as cliHighlight } from 'cli-highlight'
import type {
	GradientColors, 
	GradientOpts,
	HighlightOpts, 
} from './types'

/**
 * Export types that can be used from outside.
 *
 */
export {
	GradientColors, 
	GradientOpts,
	HighlightOpts, 
}

/**
 * Highlights the given code using CLI highlighting.
 *
 * @param   {string}        code            - The code to highlight.
 * @param   {HighlightOpts} [opts]          - Optional options for highlighting.
 * @param   {string}        [opts.language] - The language of the code to highlight. Defaults to 'auto'.
 * @param   {string}        [opts.theme]    - The theme to use for highlighting. Defaults to 'github'.
 * @returns {string}                        - The highlighted code.
 * @example
 * const code = `
 * function greet(name) {
 *     return 'Hello, ' + name + '!';
 * }
 * console.log(greet('World'));
 * `;
 * 
 * const highlightedCode = highlight(code, { language: 'javascript' });
 * console.log(highlightedCode);
 *
 */
export const highlight = ( code: string, opts?: HighlightOpts ): string => cliHighlight( code, opts )

/**
 * Provides colors for terminal output using picocolors.
 *
 * @type {object}
 * @example
 * console.log(color.green('This text is green'));
 *
 */
export const color = chalk

/**
 * Generates a gradient string with the specified colors.
 *
 * @param   {string}         txt    - The text to apply the gradient to.
 * @param   {GradientColors} colors - An array of color names or hex values.
 * @param   {GradientOpts}   [opts] - Custom opts.
 * @returns {string}                - The text with the applied gradient.
 * @example
 * // Example usage:
 * const gradientText = gradient('Gradient Text', ['red', 'yellow', 'green']);
 * console.log(gradientText);
 *
 */
export const gradient = ( txt: string, colors: GradientColors, opts?: GradientOpts ) => {

	// @ts-ignore
	return gradientString( ...colors ).multiline( txt, opts )

}

// /**
//  * Generates text with a gradient background using the specified colors.
//  *
//  * @param   {string}   txt    - The text to display with gradient background.
//  * @param   {string[]} colors - An array of background colors for the gradient.
//  * @returns {string}          - The text with gradient background.
//  */
// export const bgGradient = ( txt: string, colors: string[] ) => {

// 	let res: string = ''
// 	// Imprime cada línea con un color de fondo diferente para simular un gradiente
// 	colors.forEach( ( color, index ) => {

// 		res += chalk[color]( txt )
	
// 	} )

// 	return res

// }
