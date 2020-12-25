import loglevel from 'loglevel'
import movieModel from '../models/movieModel'
import starModel from '../models/starModel'
import { movies } from './movies'
import { stars } from './stars'

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
    loglevel.info(`failed to Load movie Data: ${err}`)
  }
}
