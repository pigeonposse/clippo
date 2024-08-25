import {
	joinPath, 
	joinUrl, 
} from '@clippo/config/core'

import {
	extra,
	bugs, 
	repository,
} from '../../package.json'
import { getSidebarUtils } from '../typedoc/get-sidebar.mjs'

const sidebarConstructor = [
	{
		text  : 'Introduction',
		items : [ { 
			text : 'What is CLIPPO?', 
			link : joinPath( extra.docsPath.guide, '/' ), 
		} ],
	},
	{
		text  : 'Reference',
		items : [
			{ 
				text      : '📚 Library', 
				collapsed : true,
				items     : [ {
					text : '🏁 Get started',
					link : joinPath( extra.docsPath.lib, 'index.md' ), 
				} ],

			},
			{ 
				text      : '🛠️ Utils', 
				collapsed : true,
				items     : await getSidebarUtils(),

			},
			{ 
				text : '🎉 Create (setup)', 
				link : joinPath( extra.docsPath.create, 'index.md' ), 
			},
			{ 
				text : '🖼️ Themes', 
				link : joinPath( extra.docsPath.themes, 'index.md' ), 
			},
		],
	},
	{
		text  : 'Contribute',
		items : [ {
			text : 'Report issues',
			link : bugs.url, 
		}, {
			text : 'Todo',
			link : joinPath( extra.docsPath.todo, '/v1' ), 
		} ],
	},
	{
		text : 'Articles, tutorials etc',
		link : joinPath( extra.docsPath.posts ), 
	},
	{
		text  : 'About',
		items : [ {
			text : 'License',
			link : joinUrl( repository.url, 'blob/main/LICENSE' ),
		}, {
			text : 'More projects',
			link : extra.collective.web, 
		} ],
	},
]

export const sidebar = { 
	'/guide/' : sidebarConstructor,
	'/todo/'  : sidebarConstructor,
}
