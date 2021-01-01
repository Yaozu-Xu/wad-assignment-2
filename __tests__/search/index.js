import request from 'supertest'
import mongoose from 'mongoose'
import api from '../../src/api'
import optimizelyClientInstance from '../../src/optimizely'

const baseUrl = '/.netlify/functions/api/search'

const keywordMovie = 'Jiu Jitsu'

const keywordStar = 'Bruce'

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

describe('search api get request testing', () => {
  it('should get the specified movie by keyword', async (done) => {
    await request(api)
      .get(`${baseUrl}/movie?keyword=${keywordMovie}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0)
        expect(res.body.pop().id).toBe(movie.id)
      })
    done()
  })
  it('should get the specfied star by keyword', async (done) => {
    await request(api)
      .get(`${baseUrl}/star?keyword=${keywordStar}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.length).toBeGreaterThan(0)
        expect(res.body.pop().name).toBe(star.name)
      })
    done()
  })
  afterAll(async () => {
    await mongoose.disconnect()
    await optimizelyClientInstance.close()
  })
})
