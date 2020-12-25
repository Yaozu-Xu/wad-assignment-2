import './db'
import express from 'express'
import dotenv from 'dotenv'
import serverless from 'serverless-http'
import movieRouter from './routes/movies'
import starRouter from './routes/stars'
import { loadMovies, loadStars } from './seed'

dotenv.config()

if (process.env.SEED_DATA === 'development') {
  loadMovies()
  loadStars()
}

const app = express()

app.use('/.netlify/functions/api/movies', movieRouter)
app.use('/.netlify/functions/api/stars', starRouter)

export const handler = serverless(app)

export default app
