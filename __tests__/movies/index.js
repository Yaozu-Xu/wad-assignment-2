import request from 'supertest'
import mongoose from 'mongoose'

let api

const baseUrl = '/.netlify/functions/api/movies'

describe('movie api testing', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    api = require('../../src/api')
  })
  afterEach((done) => {
    delete require.cache[require.resolve('../../src/api')]
    done()
  })
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
