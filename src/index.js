import express from 'express'
import serverless from 'serverless-http'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const router = express.Router()
const port = process.env.PORT

router.get('/', (req, res) => res.json({ hello: 'xyz' }))

app.use('./netlify/functions/api', router)

app.listen(port)

module.exports.handler = serverless(app)
