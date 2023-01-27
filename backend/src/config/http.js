import {createServer} from 'http'
import expressApp from '#config/express.js'

const httpServer = createServer(expressApp)

export default httpServer