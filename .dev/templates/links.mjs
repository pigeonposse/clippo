import { constructorLinks } from '@clippo/config/core'

const dataWebLinks = pkg => ( [
	{
		name  : 'Web',
		color : 'grey',
		url   : pkg.extra.collective.web, 
	},
	{
		name  : 'About Us',
		color : 'grey',
		url   : pkg.extra.collective.about,
	},
	{
		name  : 'Donate',
		color : 'pink',
		url   : pkg.funding.url,
	},
	{
		name : 'Github',
		logo : 'github',
		url  : pkg.extra.collective.gh,
	},
	{
		name : 'Twitter',
		logo : 'twitter',
		url  : pkg.extra.collective.social.twitter,
	},
	{
		name : 'Instagram',
		logo : 'instagram',
		url  : pkg.extra.collective.social.instagram,
	},
	{
		name : 'Medium',
		logo : 'medium',
		url  : pkg.extra.collective.social.medium,
	},
] )

export const collectiveImgLInks = pkg => constructorLinks( dataWebLinks( pkg ), 'img' )
