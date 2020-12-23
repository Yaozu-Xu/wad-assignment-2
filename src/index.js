import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT

app.get('/', (req, res) => res.send('Hello'))

app.listen(port, () => {
  console.info(`Server running at ${port}`)
})
