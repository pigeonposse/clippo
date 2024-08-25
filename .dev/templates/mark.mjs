/**
 * Todo.
 *
 * @description Todo.
 */

import { generateASCII } from '@clippo/config/core'

export const mark = pkg => `${generateASCII( pkg.extra.productName.toUpperCase() )}                    
                                                
REPOSITORY: ${pkg.repository.url }
AUTHORS: 
	- ${pkg.author.name} (${pkg.author.url})

BY ${pkg.extra.collective.name} 🐦🌈
` 

export const markMD = pkg => `<!--\n${mark( pkg )}\n-->`
