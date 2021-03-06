import express from 'express'
import movieModel from '../../models/movieModel'

const router = express.Router()

router.get('/', (req, res, next) => {
  movieModel.find().then((movies) => res.status(200).send(movies)).catch(next)
})

router.get('/:id', (req, res, next) => {
  // eslint-disable-next-line radix
  const id = parseInt(req.params.id)
  movieModel.findByMovieDBId(id).then((movie) => res.status(200).send(movie)).catch(next)
})

// A router for testing optimizely rollout
router.get('/feature/unfinished', (req, res) => {
  const isEnabled = req.optimizely.isFeatureEnabled(
    'feature_unfinished',
  )
  res.json({ msg: isEnabled ? 'this feature is finished' : 'this fetaure is unfinished' })
})

export default router
