import optimizelyClientInstance from '../optimizely'

const optimizelyHandler = (req, res, next) => {
  req.optimizely = optimizelyClientInstance
  next()
}

export default optimizelyHandler
