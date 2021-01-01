import './db'
import express from 'express'
import dotenv from 'dotenv'
import serverless from 'serverless-http'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import session from 'express-session'
import movieRouter from './routes/movies'
import userRouter from './routes/users'
import starRouter from './routes/stars'
import searchRouter from './routes/search'
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
// Use helmet to protect the app
app.use(helmet.contentSecurityPolicy())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())

app.use(bodyParser.json())
app.use(optimizelyHandler)
app.use(passport.initialize())
app.use('/.netlify/functions/api/movies', movieRouter)
app.use('/.netlify/functions/api/stars', starRouter)
app.use('/.netlify/functions/api/users', userRouter)
app.use('/.netlify/functions/api/search', searchRouter)
app.use(errHandler)

export const handler = serverless(app)

export default app
