import express from 'express'
import movieModel from '../../models/movieModel'

const router = express.Router()

router.get('/', (req, res, next) => {
  movieModel.find().then((movies) => res.status(200).send(movies)).catch(next)
})

router.get('/test', (req, res) => {
  res.json({ test: 'test' })
})

export default router
