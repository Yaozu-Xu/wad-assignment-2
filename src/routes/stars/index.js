import express from 'express'
import starModel from '../../models/starModel'

const router = express.Router()

router.get('/', (req, res, next) => {
  starModel.find().then((movies) => res.status(200).send(movies)).catch(next)
})

router.get('/:id', (req, res, next) => {
  // eslint-disable-next-line radix
  const id = parseInt(req.params.id)
  starModel.findStarById(id).then((star) => res.status(200).send(star)).catch(next)
})

export default router
