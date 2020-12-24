import dotenv from 'dotenv'
import mongoose from 'mongoose'
import loglevel from 'loglevel'

dotenv.config()

loglevel.setLevel('info')
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', (err) => {
  loglevel.info(`database connection error: ${err}`)
})
db.on('disconnected', () => {
  loglevel.info('database disconnected')
})
db.once('open', () => {
  loglevel.info(`database connected to ${db.name} on ${db.host}`)
})
