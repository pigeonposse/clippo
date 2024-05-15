import * as p                       from '@clack/prompts'
import type { State }               from '@clack/core'
import type { PromptParams }        from '../types'
import { prompt as promptEnquirer } from '../main'
import { symbol }                   from './state'
import number                       from './number'
import {
	box,
	columns, 
	table, 
}              from '@clippo/styles'
import { image }  from '@clippo/media'
import { qrcode } from '@clippo/qr'

/**
 * Export types that can be used from outside.
 *
 */

type TableParams = Parameters<typeof table>
type ColumnsParams = Parameters<typeof columns>
type BoxParams = Parameters<typeof box>;
type ImageParams = Parameters<typeof image>;
type QRcodeParams = Parameters<typeof qrcode>;

type PromptLineCancelProps = typeof p & {
	number: typeof number
	table: ( ...p: TableParams ) => void
	box: ( ...p: BoxParams ) => void
	columns: ( ...p: ColumnsParams ) => void
	image: ( ...p: ImageParams ) => Promise<void>
	qrcode: ( ...p: QRcodeParams ) => Promise<void>
}
export type PromptLineExecProps = PromptLineCancelProps & {
	typePrompt: <T>( props: PromptParams ) => Promise<T>
}

export type PromptLineParams = {
	intro?: string
	outro?: string
	list: ( prompt: PromptLineExecProps ) => Parameters<typeof p.group>[0]
	onCancel: ( prompt: PromptLineCancelProps ) => Promise<void>
}

const enquirer2clack = async( props: PromptParams, onCancel?: () => void ) => {

	p.log.message( )
	const res = await promptEnquirer( {
		...props,
		name   : 'id',
		// @see https://github.com/enquirer/enquirer/blob/70bdb0fedc3ed355d9d8fe4f00ac9b3874f94f61/lib/state.js#L5
		// type State = "initial" | "active" | "cancel" | "submit" | "error"
		// @ts-ignore
		prefix : state => {

			let s: State = 'active'
			if( state.cancelled ) s = 'cancel'
			if( state.submitted ) s = 'submit'
			if ( state.error !== '' ) s = 'error'
			return symbol( s )
		
		},
		// @ts-ignore
		onCancel : async( ) => {

			p.log.message( )
			if( onCancel ) await onCancel()
		
		},
	} )
	p.log.message( )
	
	// @ts-ignore
	return res.id

}

const printOptions = {
	table   : ( ...innerParams: TableParams ) => p.log.message( table( ...innerParams ) ),
	columns : ( ...innerParams: ColumnsParams ) => p.log.message( columns( ...innerParams ) ),
	box     : ( ...innerParams: BoxParams ) => p.log.message( box( ...innerParams ) ),
	image   : async ( ...innerParams: ImageParams ) => {

		const img = await image( ...innerParams )
		p.log.message( img )
	
	},
	qrcode : async ( ...innerParams: QRcodeParams ) => p.log.message( await qrcode( ...innerParams ) ),
}

/**
 * Define a group of prompts to be displayed and return a results of objects within the group.
 *
 * @param   {PromptLineParams} params - PromptOptions.
 * @returns {Promise<*>}              - Promise resolving to answers.
 * @example
 * const answers = await promptLine({
 *     intro: 'clippo init',
 *     outro: 'Succesfully finished 🌈',
 *     onCancel: p => {
 *         p.cancel('canceled 💔')
 *         process.exit(0)
 *     },
 *     list: async p => {
 *         return {
 *             name: () => p.text({
 *                 message: 'What is your organization?',
 *                 placeholder: 'PigeonPosse',
 *                 defaultValue: 'PigeonPosse',
 *             }),
 *             age: () => p.number({
 *                 message: 'What is your age?',
 *             }),
 *         }
 *     }
 * })
 * 
 * console.log(answers.name, answers.age)
 *
 */
export default async function promptLine( params: PromptLineParams ){

	const promptCancel = {
		...p,
		number,
		...printOptions,
	}
	const typePrompt   = ( props: PromptParams ) => enquirer2clack( props, () => params.onCancel( promptCancel ) )
	const prompt       = {
		...promptCancel,
		typePrompt,
	}
	
	if( params.intro ) prompt.intro( params.intro )
	const list    = await params.list( prompt )
	const results = await prompt.group( list, {
		onCancel : () => params.onCancel( prompt ),
	} )

	if( params.outro ) prompt.outro( params.outro )
	return results

}
