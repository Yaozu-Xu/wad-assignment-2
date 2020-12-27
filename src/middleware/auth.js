import passport from 'passport'
import passportJWT from 'passport-jwt'
import dotenv from 'dotenv'
import UserModel from '../models/userModel'

dotenv.config()

const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = process.env.SALT
const strategy = new JWTStrategy(jwtOptions, async (payload, next) => {
  const user = await UserModel.findByUserName(payload)
  if (user) {
    next(null, user)
  } else {
    next(null, false)
  }
})
passport.use(strategy)

export default passport
