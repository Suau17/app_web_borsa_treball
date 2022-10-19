import {createServer} from 'http'
import expressApp from './expres.js'

const httpServer = createServer(expressApp)

export default httpServer