import { joinPath } from '@clippo/config/core'

import {
	extra, 
	funding,
} from '../../package.json'

export const nav = [
	{ 
		text : 'Home', 
		link : '/', 
	},
	{ 
		text : 'Guide', 
		link : joinPath( extra.docsPath.guide, 'index.md' ), 
	},
	{
		text : 'Articles',
		link : joinPath( extra.docsPath.posts ),
	},
	{ 
		text : 'Donate', 
		link : funding.url, 
	},
]
