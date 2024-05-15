import { Fs } from './main'

const fs = new Fs()

const result = await fs.getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
// const result = await fs.getObjectFrom( './package.json' )
console.log( result )
