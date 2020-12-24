import './db'
import express from 'express'
import dotenv from 'dotenv'
import serverless from 'serverless-http'
import movieRouter from './routes/movies'
import { loadMovies } from './seed'

dotenv.config()

if (process.env.SEED_DATA === 'development') {
  loadMovies()
}

const app = express()

app.use('/.netlify/functions/api/movies', movieRouter)

export const handler = serverless(app)

module.exports = app
