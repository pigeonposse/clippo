
import {
	gradient, 
	highlight, 
	color, 
	font, 
	icon,
} from '@clippo/styles'

const line = gradient( 
	'\n' + '■'.repeat( 60 ), 
	[
		{
			color : 'yellow', pos : 0,
		},
		{
			color : 'green', pos : 0.5,
		},
		{
			color : 'red', pos : 1,
		},
	], 
)

console.log( line + '\n' )
console.log( color.bgGray( gradient( 
	font( ' PIGEON \n POSSE ', 'ANSI Shadow' ) , 
	[
		{
			color : 'yellow', pos : 0,
		},
		{
			color : 'green', pos : 0.5,
		},
		{
			color : 'red', pos : 1,
		},
	], 
) ) ) 

console.log( line )

const yml = highlight( `
###############################################################################
# FOR PIGEONPOSSE USAGE
###############################################################################

web:
  
  - id: "super8"
    name: "Super 8"
    type: "library"
    subtypes:
      - Bin
      - CLI
      - Node
    version: "{{package.version}}"

###############################################################################
`, {
	language : 'yaml',
} )

const ts = highlight( `
/**
 * Highlights the given code using CLI highlighting.
 *
 * @param   {string} code            - The code to highlight.
 * @param   {object} [opts]          - Optional options for highlighting.
 * @param   {string} [opts.language] - The language of the code to highlight. Defaults to 'auto'.
 * @param   {string} [opts.theme]    - The theme to use for highlighting. Defaults to 'github'.
 * @returns {string}                 - The highlighted code.
 */
export const highlight = ( code: string, opts?: Parameters<typeof cliHighlight>[1] ) => cliHighlight( code, opts )
`, {
	language : 'ts',
} )

const js = highlight( `
/**
 * Highlights the given code using CLI highlighting.
 *
 * @param   {string} code            - The code to highlight.
 * @param   {object} [opts]          - Optional options for highlighting.
 * @param   {string} [opts.language] - The language of the code to highlight. Defaults to 'auto'.
 * @param   {string} [opts.theme]    - The theme to use for highlighting. Defaults to 'github'.
 * @returns {string}                 - The highlighted code.
 */
export const highlight = ( code, opts ) => cliHighlight( code, opts )
`, {
	language : 'js',
} )
const md = highlight( `
# Marked in the cli
lorem ipsum
[web]("https://pigeonposse.com")` )

const html = highlight( `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
</head>
<body>
	
</body>
</html>
` )

console.log( `

Yaml:
${yml}

Typescript:
${ts}

Javascript:
${js}

Markdown:
${md}

HTML:
${html}` )

console.log( icon.warning, icon.cross, icon.arrowDown, icon.bullet )
