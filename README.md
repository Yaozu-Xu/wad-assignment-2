# Assignment 2 - Web API.

Name: YaoZu Xu

## Features.

...... A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** ......,

- Feature 1 - search routes by movie keywords
- Feature 2 - stars routes, including get famous people and save / unsave star into favourites
- Feature 3 - delete and update of user routes
- Feature 4 - i use express-validator to validate the form data

## Installation Requirements

Describe what needs to be on the machine to run the API (Node v?, NPM, MongoDB instance, any other 3rd party software not in the package.json).

Describe getting/installing the software, perhaps:

```bat
git clone https://github.com/Yaozu-Xu/wad-assignment-2.git
```

node version: v13.10.1
There is no other local software because i use cloud service instead.

```bat
npm install
```

## API Configuration

Describe any configuration that needs to take place before running the API. For example, creating an `.env` and what variables to put in it. Give an example of how this might be structured/done.
REMEMBER: DON'T PUT YOUR OWN USERNAMES/PASSWORDS/AUTH KEYS IN THE README OR ON GITHUB, just placeholders as indicated below:

```bat
NODE_ENV=development
SEED_DATA=production
SALT=JWT Token salt
SDK_KEY=Optimizely key
SILENCE_EMPTY_LAMBDA_WARNING=true
MONGO_DB=mongodb
```

## API Design

Give an overview of your web API design, perhaps similar to the following:

![][swagger1]
![][swagger2]

I host the app on Netlify and the root url shows the swagger information

https://wad-assignment2-yaozuxu.netlify.app/

## Security and Authentication

I use the same Authentication strategy as labs, the passport and sessions. But i set the expired time of the assigned token, for example

```Javascript
const token = jwt.sign({
        // add expres date for 1 day
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
        data: user.username,
},
```

As the login session lasts for 24 hours if not assigned a new token.
To extend the session time, when user access to the protected routes, it assigns a updated token and returns it to frontend. It is similar to the theory of refresh token and access token, but only one token do both refreshing and accessing job. It means that if user accesses to the protected the routes within the session time, the login session will be renewed.

The details can be seen in the protected routes:

/.netlify/functions/api/stars/save
/.netlify/functions/api/stars/unsave

## Integrating with React App

Describe how you integrated your React app with the API. Perhaps link to the React App repo and give an example of an API call from React App. For example:

Because i use firebase-auth in assignment1, which conflicts with the authentication strategy of my API. I replace some GET routes without authentication

![][api1]
![][api2]

React APP link

https://github.com/Yaozu-Xu/wad2-moviesApp

## Extra features

. . Briefly explain any non-standard features, functional or non-functional, developed for the app.

The app doesn't have too many functions, i just rewrite some of the tmdb-api. But i spent many time on the code code quality and make a good design of the project structure.

## Independent learning.

. . State the non-standard aspects of React/Express/Node (or other related technologies) that you researched and applied in this assignment . .

1. I use express-validator to validate the forms data

```Javascript
router.post('/register',
  body('username').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    // ignored
  })
```

2. I use serverless computing technology
   The apis are built into cloud functions by using packages serverless-http and netlify-lambda. When developing, the npm start command actually builds the api into a dist folder which served by Netlify. In production, the Netlify serves the apis, for instance

https://wad-assignment2-yaozuxu.netlify.app/.netlify/functions/api/movies

```Javascript
 "build": "npx netlify-lambda build src",
  "start": "npx netlify-lambda serve src",
```

3. Babel and linting

I use babel7 and airbnb rules of linting, which is not covered in the labs.

4. Use Optimizely to control the rollup

I write my own the optimize-express package and encapsulates it as a middleware :)

```Javascript
import optimizelyClientInstance from '../optimizely'

const optimizelyHandler = (req, res, next) => {
  req.optimizely = optimizelyClientInstance
  next()
}

export default optimizelyHandler
```

5. I use swagger to document the API

![][swagger1]
![][swagger2]

6. Use helmet package to secure the app

I use helmet to add header policy on the requests, preventing common web attacks like xss and injections

```Javascript
app.use(helmet.contentSecurityPolicy())
app.use(helmet.frameguard())
app.use(helmet.hidePoweredBy())
app.use(helmet.hsts())
app.use(helmet.ieNoOpen())
app.use(helmet.noSniff())
app.use(helmet.referrerPolicy())
app.use(helmet.xssFilter())
```

# Assignment 2 - Agile Software Practice.

Name: Yaozu Xu

## Target Web API.

The screenshots of swagger shows the API document

![][swagger1]

![][swagger2]

Or visit the website of the API, the root url shows the swagger document

https://wad-assignment2-yaozuxu.netlify.app/

## Error/Exception Testing.

.... From the list of endpoints above, specify those that have error/exceptional test cases in your test code, the relevant test file and the nature of the test case(s), e.g.

- Post /.netlify/functions/api/users/auth

* test when login with wrong password
  See __tests__/users/index.js

```Javascript
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
```

- Post /.netlify/functions/api/users/register

* test when register with invalid form data, such as invalid length of username
  See __tests__/users/index.js

```Javascript
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
```

- Post /.netlify/functions/api/stars/save

* test when save favourites stars without authentication.
  See __tests__/stars/index.js

```Javascript
it('should not save your favourite without authorization', async      (done) => {
    await request(api)
      .post(`${baseUrl}/${id}/save`)
      .then((res) => {
        expect(res.body).toStrictEqual({})
      })
      .catch()
    done()
  })
```

## Continuous Delivery/Deployment.

..... Specify the URLs for the staging and production deployments of your web API, e.g.

- https://wad-assignment2-staging-yaozuxu.netlify.app/ - Staging deployment
- https://wad-assignment2-yaozuxu.netlify.app/ - Production

- Staging app overview

Netlify settings overview
![][staging1]

Root page overview
![][staging2]

Movie routes overview
![][staging3]

- Production app overview

Netlify settings overview
![][production1]

Root page overview
![][swagger1]

User routes overview
![][production2]

## Feature Flags (If relevant)

... Specify the feature(s) in your web API that is/are controlled by a feature flag(s). Mention the source code files that contain the Optimizerly code that implement the flags. Show screenshots (with appropriate captions) from your Optimizely account that prove you successfully configured the flags.

![][optimizely1]
![][optimizely2]

source code 
/src/middleware/optimizelyHander.js
/src/optimzely.js

I encapsulate the optimzely instance as a middleware
```Javascript
import optimizelyClientInstance from '../optimizely'

const optimizelyHandler = (req, res, next) => {
  req.optimizely = optimizelyClientInstance
  next()
}

export default optimizelyHandler

// api.js
app.use(optimizelyHandler)

// use in routes
// A router for testing optimizely rollout
router.get('/feature/unfinished', (req, res) => {
  const isEnabled = req.optimizely.isFeatureEnabled(
    'feature_unfinished',
  )
  res.json({ msg: isEnabled ? 'this feature is finished' : 'this fetaure is unfinished' })
})
```


[swagger1]: ./screenshots/swagger1.png
[swagger2]: ./screenshots/swagger2.png
[api1]: ./screenshots/api1.png
[api2]: ./screenshots/api2.png
[staging1]: ./screenshots/staging1.png
[staging2]: ./screenshots/staging2.png
[staging3]: ./screenshots/staging3.png
[production1]: ./screenshots/production1.png
[production2]: ./screenshots/production2.png
[optimizely1]: ./screenshots/optimizely1.png
[optimizely2]: ./screenshots/optimizely2.png
