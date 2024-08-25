import {
	imgUrl, 
	joinUrl, 
}   from '@clippo/config/core'

import { info }               from './info.mjs'
import { collectiveImgLInks } from './links.mjs'
import { markMD }             from './mark.mjs'
import { org }                from './org.mjs'

export const header = pkg => {

	return `
[![HEADER](${joinUrl( pkg.extra.rawRepoUrl, '/main/docs/public/banner.png' )})](${pkg.homepage})

${collectiveImgLInks( pkg )}

${
	imgUrl( {
		name  : 'License', 
		color : 'green', 
		type  : `github/license/${pkg.extra.collective.id}/${pkg.name}`,
		url   : '/LICENSE',
	} )
}
${
	imgUrl( {
		name  : 'Version', 
		color : 'blue', 
		type  : `npm/v/${pkg.name}`,
		url   : `https://www.npmjs.com/package/${pkg.name}`,
	} )
}`

}

const content = pkg => {

	return `## Installation 

\`\`\`bash
npm install ${pkg.extra.libraryId}
# or
pnpm i ${pkg.extra.libraryId}
# or
yarn add ${pkg.extra.libraryId}
\`\`\`

## Preview

**${pkg.extra.productName}** is easy and fast 🚀🌈


`

}

export const readme = pkg => ( {
	mark    : markMD( pkg ),
	header  : header( pkg ),
	index   : info( pkg ),
	content : content( pkg ),
	org     : org( pkg ),
} )
