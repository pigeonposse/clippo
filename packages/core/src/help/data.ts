import { required } from "yargs";
import { ClippoArgs, ClippoHelp, ClippoMiddleware, Command } from "../types";
import { prefixType } from "../locales";

const arraysExactlyEqual = (arr1: unknown[], arr2: unknown[]): boolean =>{

	if (arr1.length !== arr2.length) return false
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	return true;
}


export const getData = async ({cmds, params, utils}: ClippoMiddleware) => {
	
	const { _, styles } = utils

	const getTitle = ( help?: ClippoHelp, fallbackHelp?:ClippoHelp) => {
		const t = ( h: ClippoHelp) => {
			const name = help?.title?.value ? help.title.value : fallbackHelp?.title?.value ? fallbackHelp.title.value : params.name
			return h.styles?.title ?
				h.styles?.title( {
					...h.title, 
					value: name,
					styles,
				} ) : name
		}
		if(help?.title) return t( help)
		else if(fallbackHelp?.title) return t( fallbackHelp )
		return undefined

	}

	const getStyleConstructor = (value: string, type: keyof NonNullable<ClippoHelp['styles']>, help?: ClippoHelp, fallbackHelp?:ClippoHelp)=> {

		if(help?.styles && type in help.styles && typeof help.styles[type] === 'function') {
			// @ts-ignore
			return help.styles[type]( {
				value, 
				styles,
			} )
		}else if (fallbackHelp?.styles && type in fallbackHelp.styles && typeof fallbackHelp.styles[type] === 'function') {
			// @ts-ignore
			return fallbackHelp.styles[type]({
				value,
				styles,
			})
		} 
		return value

	}
	const getSectionTitle = (value: string, help?: ClippoHelp, fallbackHelp?:ClippoHelp)=> {
		return getStyleConstructor(value, 'sectionTitle', help, fallbackHelp)
	}

	type UsageParams = {
		cmds: ClippoArgs['cmds']
		name: ClippoArgs['name']
		opts: ClippoArgs['opts']
	}

	const getUsageValue = (value: UsageParams, help?: ClippoHelp, fallbackHelp?: ClippoHelp)=> {
		const defaultUsage = value.name + ' ' +
			(value?.cmds ? _('general:usageCmds') + ' ' : '') +
			(value?.opts ? _('general:usageOpts') : '')
	
		if (help?.usage) return help.usage
		else if (help?.usage == false ) return undefined
		else if (fallbackHelp?.usage) return fallbackHelp.usage
		else if (fallbackHelp?.usage == false ) return undefined
		
		return defaultUsage

	}
	const getDocs = (help?: ClippoHelp, fallbackHelp?: ClippoHelp)=> {
		if(help?.docsUrl)
			return getStyleConstructor(help.docsUrl, 'desc', help, fallbackHelp)
		else if(fallbackHelp?.docsUrl)
			return getStyleConstructor(fallbackHelp.docsUrl, 'desc', help, fallbackHelp)
		return undefined
	}
	const getExamples = (help?: ClippoHelp, fallbackHelp?: ClippoHelp)=> {
		const returnValue = (value: NonNullable<ClippoHelp['examples']>) => {
			const styledValues = value.map(item => {
				return {
					value: getStyleConstructor(item.value, 'example', help, fallbackHelp),
					desc: getStyleConstructor(item.desc, 'desc', help, fallbackHelp),
				}
			})
			return styledValues
		}

		if(help?.examples) return returnValue(help.examples)
		else return undefined

	}
	const getOpts = ( value: ClippoArgs['opts'], help?: ClippoHelp, fallbackHelp?: ClippoHelp)=> {
		if(!value) return undefined

		const opts = Object.entries(value).map(([k,v]) => {

			const values = [
				...( v.alias ?? [] ), 
				k,
			].map( value => {
	
				if ( value.length > 2 ) return `--${value}`
				return `-${value}`
			
			} ).join( ', ' )
			const type = v.type ? v.type : 'boolean'
			return {
				value: getStyleConstructor( values, 'opt', help, fallbackHelp),
				required: v.required ? getStyleConstructor(_('general:required'), 'required', help, fallbackHelp) : undefined,
				default: v.default ? getStyleConstructor(_('general:default'), 'default', help, fallbackHelp) : undefined,
				desc: getStyleConstructor(v.desc, 'desc', help, fallbackHelp),
				type: getStyleConstructor(_(`general:${prefixType}${type}`), 'type', help, fallbackHelp),
			}
		})
		return opts
	}

	const getHelpParams = ({name, params, fallbackParams, isGlobal }:{name: string, params: Command, fallbackParams?: Command, isGlobal?: boolean}) => {
		return {
			title: getTitle(params.help, fallbackParams?.help),
			usage: {
				title: getSectionTitle(_('general:usage'), params.help, fallbackParams?.help ),
				value: getUsageValue({
					cmds: params.cmds, 
					opts: params.opts, 
					name
				}, params.help, fallbackParams?.help) 
			},
			positionals: {
				title: getSectionTitle(_('general:positionals'), params.help, fallbackParams?.help ),
				value: getOpts( params.positionals, params.help, fallbackParams?.help)  // lista de valores tipo objeto igual a: { desc: string, type: string, required?: bool, default?: string, choices?: string[]}. Puede estar vacia
			},
			cmds: {
				title: getSectionTitle(_('general:commands'), params.help, fallbackParams?.help ),
				value: getOpts( params.cmds, params.help, fallbackParams?.help)  // lista de valores tipo objeto igual a: { desc: string, type: string, required?: bool}. Puede estar vacia
			}, 
			opts: {
				title: getSectionTitle(isGlobal ? _('general:globalOptions') : _('general:options'), params.help, fallbackParams?.help ),
				value: getOpts( params.opts, params.help, fallbackParams?.help) 
			},  
			examples: {
				title: getSectionTitle(_('general:examples'), params.help, fallbackParams?.help ),
				value: getExamples(params.help, fallbackParams?.help)
			},
			docs: {
				title: getSectionTitle(_('general:docs'), params.help, fallbackParams?.help ),
				value: getDocs( params.help, fallbackParams?.help )
			}
		}
	}
	type ChildData = {
		name: string,
		params: {[k in string]: Command}, 
		fallbackKeys?: string[], 
		fallbackParams?: Command 
	}

	const getChildsData = ({name, params, fallbackKeys,fallbackParams}: ChildData ) => {
		const result: ({
			includes: string[]
			value: ReturnType<typeof getHelpParams>
		})[] = [];

    	for (const [key, value] of Object.entries(params)) {
			const includeKeys = [...(fallbackKeys ? fallbackKeys : []), key]
			const childData = {
				includes: includeKeys,
				value: getHelpParams({
					name,
					params: value,
					fallbackParams,
				})
			}
			if (value.cmds) {
				const childResult = getChildsData({
					name, 
					params: value.cmds, 
					fallbackKeys: includeKeys, 
					fallbackParams: value
			})
				result.push(...childResult);
			}
			result.push(childData);
		}
		return result
	}
	const data = {
		global: getHelpParams({
			name: params.name, 
			params, 
			isGlobal: true,
		}),
		childs: params.cmds ?getChildsData({
			name: params.name, 
			params: params.cmds,
		}): [],
	}

	const isGlobal = cmds.length <= 0
	const currentData = isGlobal ? data.global : data.childs.filter(d => arraysExactlyEqual(d.includes, cmds))[0].value
	
	return {
		data,
		isGlobal,
		currentData
	}

}
