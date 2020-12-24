import request from 'supertest'
import mongoose from 'mongoose'
import api from '../../src/api'

const baseUrl = '/.netlify/functions/api/movies'

describe('movie api testing', () => {
  it('get the movie list api', async (done) => {
    await request(api)
      .get(baseUrl)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0)
      })
    done()
  })
  afterAll(async () => {
    await mongoose.disconnect()
  })
})
