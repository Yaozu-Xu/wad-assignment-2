import express from 'express'
import dotenv from 'dotenv'
import serverless from 'serverless-http'
import movieRouter from './routes/movies'

dotenv.config()

const app = express()

app.use('/.netlify/functions/index', movieRouter)

// eslint-disable-next-line import/prefer-default-export
export const handler = serverless(app)
