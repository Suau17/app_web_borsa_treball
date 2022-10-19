import {createServer} from 'http'
import expressApp from '#config/expres.js'

const httpServer = createServer(expressApp)

export default httpServer