import express from 'express'
import {
  query,
  validationResult,
} from 'express-validator'
import movieModel from '../../models/movieModel'
import starModel from '../../models/starModel'

const router = express.Router()

router.get('/movie',
  query('keyword').isString().withMessage('Only letters and digits allowed in keywords')
    .trim()
    .isLength({
      min: 2,
    })
    .withMessage('Title too short. Enter a longer keywords'),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    await movieModel.findByKeword(req.query.keyword)
      .then((movies) => res.status(200).send(movies)).catch(next)
  })

router.get('/star',
  query('keyword').isString().withMessage('Only letters and digits allowed in keywords')
    .trim(),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    await starModel.findByKeyword(req.query.keyword)
      .then((movies) => res.status(200).send(movies)).catch(next)
  })

export default router
