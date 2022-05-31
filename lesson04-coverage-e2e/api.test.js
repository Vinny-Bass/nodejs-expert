const { describe, it } = require('mocha')
const request = require('supertest')
const api = require('./api')
const assert = require('assert')

describe('API Suite Test', () => {
  describe('/contact', () => {
    it('should return an 200 HTTP response', async () => {
      const response = await request(api).get('/contact').expect(200)

      assert.deepStrictEqual(response.text, 'contact us page')
    })

    it('should hit an unexisting route and be redirected to the default route', async () => {
      const response = await request(api).get('/unexistent').expect(200)

      assert.deepStrictEqual(response.text, 'hello world')
    })

    it('should not login with invalid credentials', async () => {
      const response = await request(api)
        .post('/login')
        .send({ username: 'invalid', password: '123' })
        .expect(401)

      assert.deepStrictEqual(response.text, 'invalid credentials')
    })

    it('should make a success login', async () => {
      const response = await request(api)
        .post('/login')
        .send({ username: 'vinny', password: '123' })
        .expect(200)

      assert.deepStrictEqual(response.text, 'success login')
    })
  })
})