/* eslint-disable func-names */
import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const { Schema } = mongoose

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  savedStars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stars' }],
})

UserSchema.path('password').validate((value) => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
  return re.test(value)
}, 'Password is invalid')

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}

UserSchema.pre('save', function (next) {
  const user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) {
          return next(error)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.statics.findByUserName = function (username) {
  return this.findOne({
    username,
  })
}

UserSchema.statics.findById = function (_id) {
  return this.findOne({
    _id,
  })
}

UserSchema.statics.findByEmail = function (email) {
  return this.findOne({
    email,
  })
}

export default mongoose.model('User', UserSchema)
