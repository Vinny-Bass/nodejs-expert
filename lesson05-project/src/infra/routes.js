const logger = require('./utils')
const { once } = require('events')
const { join } = require('path')
const CarController = require('../controllers/CarController')

async function routes(request, response) {
  const { method, url } = request

  if (method === 'POST' && url === '/rent') {
    const data = await once(request, 'data')
    const { customer, carCategory, numberOfDays } = JSON.parse(data)
    const carsDatabase = join(__dirname, './../../database', 'cars.json')
    const carController = new CarController(carsDatabase)
    const result = await carController.rentCar(customer, carCategory, numberOfDays)
    return response.end(JSON.stringify(result))
  }

  response.writeHead(404)
  return response.end()
}


function handleError(error, response) {
  logger.warn(`error on API: ${error.stack}`)
  response.writeHead(500)
  return response.end()
}

function handler(request, response) {
  return routes(request, response).catch(error => handleError(error, response))
}

module.exports = handler