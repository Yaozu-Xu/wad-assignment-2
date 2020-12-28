import './db'
import express from 'express'
import dotenv from 'dotenv'
import serverless from 'serverless-http'
import bodyParser from 'body-parser'
import session from 'express-session'
import movieRouter from './routes/movies'
import userRouter from './routes/users'
import starRouter from './routes/stars'
import { errHandler, passport, optimizelyHandler } from './middleware'
import { loadMovies, loadStars, loadUsers } from './seed'

dotenv.config()

if (process.env.SEED_DATA === 'development') {
  loadMovies()
  loadStars()
  loadUsers()
}

const app = express()

app.use(session({
  secret: 'XYZ',
  resave: true,
  saveUninitialized: true,
}))
app.use(bodyParser.json())
app.use(optimizelyHandler)
app.use(passport.initialize())
app.use('/.netlify/functions/api/movies', movieRouter)
app.use('/.netlify/functions/api/stars', starRouter)
app.use('/.netlify/functions/api/users', userRouter)
app.use(errHandler)

export const handler = serverless(app)

export default app
