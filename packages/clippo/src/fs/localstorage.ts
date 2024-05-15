import { LocalStorage } from 'node-localstorage'

export default ( location: string ) => new LocalStorage( location )
