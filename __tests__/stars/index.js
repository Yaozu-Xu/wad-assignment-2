import request from 'supertest'
import mongoose from 'mongoose'
import api from '../../src/api'
import optimizelyClientInstance from '../../src/optimizely'

const baseUrl = '/.netlify/functions/api/stars'
const userUrl = '/.netlify/functions/api/users'
let token
const id = 62
const validUser = {
  username: 'user1',
  password: 'Pwduser1',
}

const star = {
  adult: false,
  gender: 2,
  id: 62,
  known_for: [
    {
      adult: false,
      backdrop_path: '/w7RDIgQM6bLT7JXtH4iUQd3Iwxm.jpg',
      genre_ids: [
        53,
        80,
      ],
      id: 680,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Pulp Fiction',
      overview: "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper. Their adventures unfurl in three stories that ingeniously trip back and forth in time.",
      poster_path: '/dRZpdpKLgN9nk57zggJCs1TjJb4.jpg',
      release_date: '1994-09-10',
      title: 'Pulp Fiction',
      video: false,
      vote_average: 8.5,
      vote_count: 20124,
    },
    {
      adult: false,
      backdrop_path: '/9pkZesKMnblFfKxEhQx45YQ2kIe.jpg',
      genre_ids: [
        27,
        53,
      ],
      id: 381288,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'Split',
      overview: 'Though Kevin has evidenced 23 personalities to his trusted psychiatrist, Dr. Fletcher, there remains one still submerged who is set to materialize and dominate all the others. Compelled to abduct three teenage girls led by the willful, observant Casey, Kevin reaches a war for survival among all of those contained within him — as well as everyone around him — as the walls between his compartments shatter apart.',
      poster_path: '/bqb9WsmZmDIKxqYmBJ9lj7J6hzn.jpg',
      release_date: '2017-01-09',
      title: 'Split',
      video: false,
      vote_average: 7.3,
      vote_count: 13195,
    },
    {
      adult: false,
      backdrop_path: '/6TjllWT3cGrPFyqDXurVZ3L8bBi.jpg',
      genre_ids: [
        9648,
        53,
        18,
      ],
      id: 745,
      media_type: 'movie',
      original_language: 'en',
      original_title: 'The Sixth Sense',
      overview: 'A psychological thriller about an eight year old boy named Cole Sear who believes he can see into the world of the dead. A child psychologist named Malcolm Crowe comes to Cole to help him deal with his problem, learning that he really can see the ghosts of dead people.',
      poster_path: '/fIssD3w3SvIhPPmVo4WMgZDVLID.jpg',
      release_date: '1999-08-06',
      title: 'The Sixth Sense',
      video: false,
      vote_average: 7.9,
      vote_count: 8107,
    },
  ],
  known_for_department: 'Acting',
  name: 'Bruce Willis',
  popularity: 46.738,
  profile_path: '/A1XBu3CffBpSK8HEIJM8q7Mn4lz.jpg',
}

describe('Star api get request testing', () => {
  it('should get star list', async (done) => {
    await request(api)
      .get(baseUrl)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0)
      })
    done()
  })
  it('should get the specified star by id', async (done) => {
    await request(api)
      .get(`${baseUrl}/${id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.id).toBe(star.id)
        expect(res.body.gender).toBe(star.gender)
      })
    done()
  })
})

describe('Star api save and unsave request testing', () => {
  beforeAll(async () => {
    await request(api)
      .post(`${userUrl}/auth`)
      .send(validUser)
      .then((res) => {
        token = res.body.token
      })
  })
  it('should save your favourite star successfully', async (done) => {
    await request(api)
      .post(`${baseUrl}/${id}/save`)
      .set('authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe('successfully saved star')
      })
    done()
  })
  it('should not save your favourite without authorization', async (done) => {
    await request(api)
      .post(`${baseUrl}/${id}/save`)
      .then((res) => {
        expect(res.body).toStrictEqual({})
      })
      .catch()
    done()
  })
  it('should unsave your favourite star successfully', async (done) => {
    await request(api)
      .delete(`${baseUrl}/${id}/unsave`)
      .set('authorization', token)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.msg).toBe('successfully unsaved star')
      })
    done()
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await optimizelyClientInstance.close()
  })
})
