import request from 'supertest'
import mongoose from 'mongoose'
import api from '../../src/api'
import optimizelyClientInstance from '../../src/optimizely'

const baseUrl = '/.netlify/functions/api/users'

const user = {
  username: 'user1',
  email: 'user1@gamil.com',
}

const validUser = {
  username: 'user3',
  email: 'user3@gmail.com',
  password: 'Pwduser3',
}

const invalidUser = {
  username: 'user3',
  email: 'user3@gmail.com',
  password: 'error',
}

describe('user api get request testing', () => {
  it('should get the user list', async (done) => {
    await request(api)
      .get(baseUrl)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0)
      })
    done()
  })
  it('should get the specfied user', async (done) => {
    await request(api)
      .get(`${baseUrl}/${user.username}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.username).toBe(user.username)
        expect(res.body.email).toBe(user.email)
      })
    done()
  })
})

describe('user api post request testing', () => {
  it('should return 201 code by posting valid data', async (done) => {
    await request(api)
      .post(`${baseUrl}/register`)
      .send(validUser)
      .expect(201)
      .then((res) => {
        expect(res.body.msg).toBe('Successful created new user')
      })
    done()
  })
  it('should return 400 code by posting invalid data', async (done) => {
    await request(api)
      .post(`${baseUrl}/register`)
      .send(invalidUser)
      .expect(400)
      .then((res) => {
        expect(res.body.errors.length).toBeGreaterThan(0)
      })
    done()
  })
})

describe('user api signin and auth request testing', () => {
  it('should return 401 code by posting invalid password', async (done) => {
    await request(api)
      .post(`${baseUrl}/auth`)
      .send(invalidUser)
      .then((res) => {
        expect(res.body.msg).toBe('Authentication failed. Wrong password.')
      })
    done()
  })
  it('should return 200 code by posting a valid user', async (done) => {
    await request(api)
      .post(`${baseUrl}/auth`)
      .send(validUser)
      .then((res) => {
        expect(res.body.success).toBe(true)
      })
    done()
  })
})

describe('user api delete request testing', () => {
  it('should return 200 code by delete a existed user', async (done) => {
    await request(api)
      .get(`${baseUrl}/${validUser.username}`)
      .then(async (res) => {
        const { _id } = res.body
        await request(api)
          .delete(`${baseUrl}/${_id}`)
          .expect(200)
          .then((deleteResponse) => {
            expect(deleteResponse.body.msg).toBe('update user successfully')
          })
      })
    done()
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await optimizelyClientInstance.close()
  })
})
