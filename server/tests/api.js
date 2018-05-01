const path = require('path')
require('dotenv').config({ path: path.resolve(process.cwd(), '.env.test') })

const { expect } = require('chai')
const request = require('supertest');

const app = require('../src/app')
const mrCleaner = require('./util/mrCleaner')

describe('[API] - test REST urls', () => {

  afterEach(() => mrCleaner())

  describe('POST /register', () => {
    it('Register a new user', async () => {
      const payload = {
        username: 'jack',
        email: 'eccentric@email.fr',
        password: 'private'
      }

      const res = await request(app)
        .post('/register')
        .send(payload)

      expect(res.body.id).to.be.an('integer')
      expect(res.body.username).to.eql(payload.username)
      expect(res.body.email).to.eql(payload.email)
    })
  })


  describe('POST /authenticate', () => {

  })

  describe('GET /me', () => {

  })

})
