import express from 'express'
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator'
import User from '../../models/userModel'

const router = express.Router()

router.get('/', (req, res, next) => {
  User.find().then((users) => res.status(200).json(users)).catch(next)
})

router.get('/:username', (req, res, next) => {
  const { username } = req.params
  User.findByUserName(username).then((users) => res.status(200).json(users)).catch(next)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  const hasUser = await User.findById(id)
  if (!hasUser) {
    return res.status(400).json({ err: 'no such user' })
  }
  await User.deleteOne({ _id: id })
  return res.status(200).json({ msg: 'update user successfully' })
})

// create new user
router.post('/register',
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    await User.create(req.body).catch(next)
    return res.status(201).json({
      code: 201,
      msg: 'Successful created new user',
    })
  })

router.post('/auth', async (req, res, next) => {
  const user = await User.findByUserName(req.body.username).catch(next)
  if (!user) {
    return res.status(401).json({
      code: 401,
      msg: 'Authentication failed. User not found.',
    })
  }
  await user.comparePassword(req.body.password, (err, isMatch) => {
    if (isMatch && !err) {
      const token = jwt.sign(user.username, process.env.SALT)
      res.status(200).json({
        success: true,
        token,
      })
    } else {
      res.status(401).json({
        code: 401,
        msg: 'Authentication failed. Wrong password.',
      })
    }
  })
})

// update registered user info
router.put('/put/:id',
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    await User.update({
      _id: req.params.id,
    }, req.body, {
      upsert: false,
    }).then(() => res.status(200).json({ msg: 'update user successfully' })).catch(next)
  })

export default router
