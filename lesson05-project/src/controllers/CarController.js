const CarService = require('../entities/service/CarService')

class CarController {
  constructor(carsPath) {
    this.service = new CarService({ cars: carsPath })
  }

  async rentCar(customer, carCategory, numberOfDays) {
    return this.service.rent(customer, carCategory, numberOfDays)
  }
}

module.exports = CarController