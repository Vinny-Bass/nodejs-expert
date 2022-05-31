"use strict";var describe,it;module.link('mocha',{describe(v){describe=v},it(v){it=v}},0);var expect;module.link('chai',{expect(v){expect=v}},1);var Person;module.link('./../src/person.js',{default(v){Person=v}},2);



describe('Person', () => {
  it('should return a person instance from a string', () => {
    const mockInputData = '2, Carro,Moto 20000 2020-01-05 2021-02-05'
    const result = Person.generateInstanceFromString(mockInputData)

    const expected = {
      id: 2,
      vehicles: ['Carro', 'Moto'],
      kmTraveled: 20000,
      from: '2020-01-05',
      to: '2021-02-05'
    }

    expect(result).to.be.deep.equal(expected)
  })

  it('should format the properties given a language', () => {
    const language = 'pt-br'
    const person = new Person({
      id: 2,
      vehicles: ['Carro', 'Moto'],
      kmTraveled: 20000,
      from: '2020-01-05',
      to: '2021-02-05'
    })

    const result = person.formatted(language)

    const expected = {
      id: 2,
      vehicles: 'Carro e Moto',
      kmTraveled: '20.000 km',
      from: '05 de janeiro de 2020',
      to: '05 de fevereiro de 2021'
    }

    expect(result).to.be.deep.equal(expected)
  })

  it('should return an error if wrong string is passed to generate a person instance', () => {
    const invalidMockInputData = 'asdasdasdasd'

    expect(() => Person.generateInstanceFromString(invalidMockInputData)).to.throw('Invalid params')
  })
})