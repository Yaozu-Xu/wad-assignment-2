import express from 'express'
import jwt from 'jsonwebtoken'
import { passport } from '../../middleware'
import starModel from '../../models/starModel'
import userModel from '../../models/userModel'

const router = express.Router()

router.get('/', (req, res, next) => {
  starModel.find().then((movies) => res.status(200).send(movies)).catch(next)
})

router.get('/:id', (req, res, next) => {
  const id = parseInt(req.params.id)
  starModel.findStarById(id).then((star) => res.status(200).send(star)).catch(next)
})

router.post('/:id/save',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      const { authorization } = req.headers
      const star = await starModel.findStarById(id)
      const decoded = jwt.verify(authorization, process.env.SALT)
      await userModel.update({ username: decoded.data }, { $push: { savedStars: star } })
      res.status(200).send({ msg: 'successfully saved star' })
    } catch (err) {
      return res.status(400).send({ msg: err.toString() })
    }
  })

router.delete('/:id/unsave',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const id = parseInt(req.params.id)
    try {
      const { authorization } = req.headers
      const star = await starModel.findStarById(id)
      const { _id } = star
      const decoded = jwt.verify(authorization, process.env.SALT)
      await userModel.update({ username: decoded.data }, { $pull: { savedStars: _id } })
      res.status(200).send({ msg: 'successfully unsaved star' })
    } catch (err) {
      return res.status(400).send({ msg: err.toString() })
    }
  })

export default router
