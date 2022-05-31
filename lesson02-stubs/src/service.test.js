const sinon = require('sinon')
const { deepStrictEqual } = require('assert')

const Service = require('./service')

const BASE_URL_1 = 'https://swapi.dev/api/people/1'
const BASE_URL_2 = 'https://swapi.dev/api/people/2'
const mocks = {
  luke: require('./mocks/luke.json'),
  c3po: require('./mocks/c3po.json'),
}

  ; (async () => {

    // {
    //   // Vai na internet, maneira errada, deve ser usada apenas para criar o mock
    //   const service = new Service()
    //   const withoutStub = await service.makeRequest(BASE_URL_2)
    //   console.log(JSON.stringify(withoutStub))
    // }

    const service = new Service()
    const stub = sinon.stub(service, service.makeRequest.name)

    stub.withArgs(BASE_URL_1).resolves(mocks.luke)
    stub.withArgs(BASE_URL_2).resolves(mocks.c3po)

    {
      const expected = {
        "name": "Luke Skywalker",
        "mass": "77",
      }
      const response = await service.getPeople(BASE_URL_1)
      deepStrictEqual(response, expected)
    }

    {
      const expected = {
        "name": "C-3PO",
        "mass": "76",
      }
      const response = await service.getPeople(BASE_URL_2)
      deepStrictEqual(response, expected)
    }

  })()