const { describe, it } = require('mocha')
const request = require('supertest')
const api = require('../../src/index')
const assert = require('assert')

const mockData = {
  request: {
    "customer": {
      "id": 1,
      "name": "Vinicius Bass",
      "age": 20
    },
    "carCategory": {
      "id": "adaae0ca-0d74-494f-87d2-9fef080eebc4",
      "name": "Coupe",
      "carIds": [
        "05a225cf-d12b-48f7-843c-e53aa7e4aa52"
      ],
      "price": "54.14"
    },
    "numberOfDays": 5
  },
  response: {
    "customer": {
      "id": 1,
      "name": "Vinicius Bass",
      "age": 20
    },
    "car": {
      "id": "05a225cf-d12b-48f7-843c-e53aa7e4aa52",
      "name": "V90",
      "releaseYear": 2021,
      "available": true,
      "gasAvailable": true
    },
    "amount": "R$ 297,77",
    "dueDate": "1 de junho de 2022"
  }

}


describe('API Suite Test', () => {
  describe('/rent', () => {

    it('should return an 200 HTTP response with transaction data in case of success', async () => {
      const response = await request(api)
        .post('/rent')
        .send(mockData.request)
        .expect(200)

      const result = JSON.parse(response.text)
      const expected = mockData.response

      assert.deepStrictEqual(result, expected)
    })

    it('should return 404 if a non existent route is requested', async () => {
      await request(api).get('/unexistent').expect(404)
    })

    it('should return 500 when correct params is not passed', async () => {
      const invalidData = mockData.request
      delete invalidData.customer

      await request(api).post('/rent').send(invalidData).expect(500)
    })

  })
})