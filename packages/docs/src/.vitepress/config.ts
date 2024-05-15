/**
 * Vitepress config.
 *
 * @description Vitepress config.
 * @see https://vitepress.dev/reference/site-config
 * @see https://vitepress.dev/reference/default-theme-config
 */

import { defineConfig } from 'vitepress'
import { description, funding, extra, repository, bugs, license} from "../../../../package.json"
import MarkdownItTaskList from 'markdown-it-task-lists'

const isDev = process.env.NODE_ENV !== 'production'
export const srcDir = isDev ? '../../../docs' : './__temp__/docs'
const name = extra.productName
const repoUrl = repository.url.endsWith('/') ? repository.url : repository.url +'/' ;
const npmSVG = `<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>npm</title><path d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"/></svg>`
const sidebar = [
	{
	  text: 'Introduction',
	  items: [
		{ text: 'Getting started', link: '/guide/getting-started' },
	  ]
	},
	{
	  text: 'Reference',
	  items: [
		{ text: 'Init', link: '/guide/init' },
		{ 
		  text: 'Build', 
		  link: '/guide/build/index', 
		  collapsed: false, 
		  items: [
		  { text: 'With Config file', link: '/guide/build/config-file' },
		  { 
			  text: 'Browsers', 
			  collapsed: false, 
			  items: [
				  { text: 'Chromium', link: '/guide/build/chromium' },
				  { text: 'Chrome', link: '/guide/build/chrome' },
				  { text: 'Firefox', link: '/guide/build/firefox' },
				  { text: 'Edge', link: '/guide/build/edge' },
				  { text: 'Safari', link: '/guide/build/safari' },
				  { text: 'Brave', link: '/guide/build/brave' },
				  { text: 'Opera', link: '/guide/build/opera' },
				  { text: 'Opera GX', link: '/guide/build/opera-gx' },
				  { text: 'Yandex', link: '/guide/build/yandex' },
				  { text: 'Custom', link: '/guide/build/custom' },
			  ]
		  },
		  { text: 'All', link: '/guide/build/all' },
		] }
	  ]
	},
	{
		text: 'Plugins',
		link: '/plugins/modules'
	},
	{
	  text: 'Github Action',
	  link: '/guide/gh-action' 
	},
	{
	  text: 'Contribute',
	  items: [
		{ text: 'Report issues', link: bugs.url },
		{ text: 'Todo', link: '/todo/v1' },
	  ]
	},
	{
		text: 'Articles, tutorials etc',
		link: '/posts' 
	},
	{
	  text: 'About',
	  items: [
		{ text: 'License', link: repoUrl+ 'blob/main/LICENSE'},
		{ text: 'More projects', link: extra.collective.web },
	  ]
	}
  ]
export default defineConfig({

  title: `${name} - A Cross-Browser Extension Builder`,
  titleTemplate: `:title - ${name} Documentation`,
  description,
  lang: 'en',
  markdown: {
    config: (md) => {
        md.use(MarkdownItTaskList)
    }
  },
  cacheDir: '../__cache__',
  outDir: '../dist',
  srcDir,
  cleanUrls: true,
//   ignoreDeadLinks: true,
  head: [[
    'link', 
    { 
      rel: 'icon', 
      href: '/favicon.png' // use first "/" for child routes
    }
  ]],
  themeConfig: {
	// ...posts,
    logo: '/logo.png', // use first "/" for child routes
    siteTitle: extra.productName.toUpperCase(),
    search: {
      provider: 'local'
    },
	editLink: {
		pattern: repoUrl+ 'edit/main/docs/:path',
	},
	outline: 'deep',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
	  {
		text: 'Articles',
		link: '/posts',
	  },
      { 
        text: 'Donate', 
        link: funding.url 
      },
    ],

    sidebar: { 
		'/guide/': sidebar,
		'/todo/': sidebar
	},
    // socialLinks: extra.socialLinks as DefaultTheme.SocialLink[],
    socialLinks: [
		{ 
			icon: {svg: npmSVG}, 
			link: extra.libraryUrl 
		},
      	{ icon: 'github', link: repository.url },
    ],
	// @ts-ignore
	collectiveLinks : {
		...extra.collective.social,
		web: extra.collective.web,
		email: extra.collective.email
	},
	customFooter: {
		license,
		copy: {
			name: extra.collective.name,
			url: extra.collective.url
		}
	},
  }
})
