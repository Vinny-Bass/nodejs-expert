const rewiremock = require('rewiremock/node')
const { deepStrictEqual } = require('assert')

// poderia estar em outro arquivo
const dbData = [{ name: 'teste1' }, { name: 'teste2' }]
class MockDatabase {
  connect = () => this
  find = async (query) => dbData
}

rewiremock(() => require('./../src/util/database')).with(MockDatabase)

  ; (async () => {
    {
      const expected = [{ name: 'TESTE1' }, { name: 'TESTE2' }]
      rewiremock.enable()
      const UserFactory = require('../src/factory/userFactory')

      const userFactory = await UserFactory.createInstance()
      const result = await userFactory.find()
      deepStrictEqual(result, expected)
      rewiremock.disable()
    }
  })()