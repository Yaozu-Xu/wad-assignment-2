import loglevel from 'loglevel'
import movieModel from '../models/movieModel'
import { movies } from './movies'

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
