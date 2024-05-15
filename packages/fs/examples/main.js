
import { Fs } from '@clippo/fs'
const fs     = new Fs()
const result = await fs.getObjectFrom( 'https://raw.githubusercontent.com/pigeonposse/super8/main/.pigeonposse.yml' )
const pkg    = await fs.getObjectFromPath( './','package' )
console.log( result.web[0], pkg )
