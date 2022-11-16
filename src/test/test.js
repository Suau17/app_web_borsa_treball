import test from 'node:test'
import assert from 'node:assert'
import app from '#config/express.js'

test('example test', async () => {
    await request(app).get('/userRegistrer')
})