export const errHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(500).send(err.message)
  }
  res.status(500).send(`Error is ${err.message}, ${err.stack} `)
  next()
}
