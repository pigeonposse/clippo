/**
 * Todo.
 *
 * @description Todo.
 */

import { generateASCII } from '../core/main.mjs'
export const mark = pkg => {

	const data       = pkg.data
	const author     = data.author.name 
	const authorLink = data.author.url 
	const repoUrl    = data.repository.url 
	const name = data.extra.productName.toUpperCase()
	// const version    = data.version ? data.version : 'UNDEFINDED'

	return `${generateASCII( name )}                    
                                                
REPOSITORY: ${repoUrl}
AUTHORS: 
	- ${author} (${authorLink})

BY ${data.extra.collective.name} 🐦🌈
` 

}
