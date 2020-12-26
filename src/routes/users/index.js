import express from 'express'
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

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params
  const hasUser = await User.findById(id)
  if (!hasUser) {
    return res.status(400).json({ err: 'no such user' })
  }
  await User.deleteOne({ _id: id })
  return res.status(200).json({ msg: 'update user successfully' }).catch(next)
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
