/**
 * Vitepress config.
 *
 * @description Vitepress config.
 * @see https://vitepress.dev/reference/site-config
 * @see https://vitepress.dev/reference/default-theme-config
 */

import { defineConfig } from 'vitepress'
import { description, extra, repository, license} from "../../../../package.json"
import MarkdownItTaskList from 'markdown-it-task-lists'
import {srcDir, npmSVG} from './const'
import { nav, sidebar } from '../../../../.dev/docs/main.mjs'
import { joinUrl } from '@clippo/config/core'

const name = extra.productName

export default defineConfig({

  title: `${name} - ${extra.shortDesc}`,
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
		pattern: joinUrl(repository.url, 'edit/main/docs/:path'),
	},
	outline: 'deep',
    nav,
    sidebar,
    // socialLinks: extra.socialLinks as DefaultTheme.SocialLink[],
    socialLinks: [
		{ 
			icon: {svg: npmSVG}, 
			link: extra.libraryUrl 
		},
      	{ 
			icon: 'github', 
			link: repository.url 
		},
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
