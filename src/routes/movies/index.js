import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ movie: 'test' })
})

router.get('/test', (req, res) => {
  res.json({ test: 'test' })
})

export default router
