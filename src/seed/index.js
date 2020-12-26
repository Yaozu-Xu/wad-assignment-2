import loglevel from 'loglevel'
import movieModel from '../models/movieModel'
import starModel from '../models/starModel'
import userModel from '../models/userModel'
import { movies } from './movies'
import { stars } from './stars'
import { users } from './users'

loglevel.setLevel('info')

export const loadMovies = async () => {
  try {
    await movieModel.deleteMany()
    await movieModel.collection.insertMany(movies)
    loglevel.info('successfully load movies')
  } catch (err) {
    loglevel.info(`failed to Load movie Data: ${err}`)
  }
}

export const loadStars = async () => {
  try {
    await starModel.deleteMany()
    await starModel.collection.insertMany(stars)
    loglevel.info('successfully load stars')
  } catch (err) {
    loglevel.info(`failed to Load star Data: ${err}`)
  }
}

export const loadUsers = async () => {
  try {
    await userModel.deleteMany()
    await userModel.collection.insertMany(users)
    loglevel.info('successfully load users')
  } catch (err) {
    loglevel.info(`failed to Load user Data: ${err}`)
  }
}
