import request from 'supertest'
import mongoose from 'mongoose'
import api from '../../src/api'
import optimizelyClientInstance from '../../src/optimizely'

const baseUrl = '/.netlify/functions/api/movies'

const id = 590706

const movie = {
  adult: false,
  backdrop_path: '/jeAQdDX9nguP6YOX6QSWKDPkbBo.jpg',
  genre_ids: [
    28,
    14,
    878,
  ],
  id: 590706,
  original_language: 'en',
  original_title: 'Jiu Jitsu',
  overview: 'Every six years, an ancient order of jiu-jitsu fighters joins forces to battle a vicious race of alien invaders. But when a celebrated war hero goes down in defeat, the fate of the planet and mankind hangs in the balance.',
  popularity: 2633.943,
  poster_path: '/eLT8Cu357VOwBVTitkmlDEg32Fs.jpg',
  release_date: '2020-11-20',
  title: 'Jiu Jitsu',
  video: false,
  vote_average: 5.9,
  vote_count: 111,
}

describe('movie api get request testing', () => {
  it('should get the movie list', async (done) => {
    await request(api)
      .get(baseUrl)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0)
      })
    done()
  })
  it('should get the specfied movie', async (done) => {
    await request(api)
      .get(`${baseUrl}/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(movie.id)
        expect(res.body.backdrop_pat).toBe(movie.backdrop_pat)
      })
    done()
  })
  it('should return unfinished by requesting a unfinished route', async (done) => {
    await request(api)
      .get(`${baseUrl}/feature/unfinished`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe('this fetaure is unfinished')
      })
    done()
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await optimizelyClientInstance.close()
  })
})
