import { imgUrl } from '@clippo/config/core'

import { info }   from './info.mjs'
import { markMD } from './mark.mjs'
import { org }    from './org.mjs'

const readmeUtilsCore = ( {
	mainPKG,
	PKG,
	content,
	examples,
} ) => `${PKG.description}

${
	imgUrl( {
		name  : 'License', 
		color : 'green', 
		type  : `github/license/${mainPKG.extra.collective.id}/${PKG.name}`,
		url   : '/LICENSE',
	} )
}
${
	imgUrl( {
		name  : 'Version', 
		color : 'blue', 
		type  : `npm/v/${PKG.name}`,
		url   : `https://www.npmjs.com/package/${PKG.name}`,
	} )
}

## Installation

\`\`\`bash
npm i ${PKG.name}
# or
pnpm i ${PKG.name}
# or
yarn add ${PKG.name}
\`\`\`

${content}
${examples ? '## Examples\n\n' + examples : '\n'}`

export const readmeUtilsDocs = ( {
	mainPKG, 
	PKG,
	content,
	examples,
} ) => `---
outline: [2,3]
---

# ${PKG.extra.emoji} ${PKG.extra.productName}

${readmeUtilsCore( {
		mainPKG,
		PKG,
		content,
		examples,
	} )
}

## Utils Index

[Go to index](../index.md) 👈
`

export const readmeUtils = ( {
	mainPKG, 
	PKG,
	content,
	examples,
} ) => `# ${mainPKG.extra.productName} | ${PKG.extra.productName} ${PKG.extra.emoji} 

${
	readmeUtilsCore( {
		mainPKG,
		PKG,
		content,
		examples,
	} )
}
## More info

${info( mainPKG )}

${org( mainPKG )}

${markMD( mainPKG )}
`
