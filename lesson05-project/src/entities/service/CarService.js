const BaseRepository = require("../../repository/base/baseRepository");
const Tax = require("../Tax");
const Transaction = require("../Transaction")

class CarService {
  constructor({ cars }) {
    this.carRepository = new BaseRepository({ file: cars })
    this.taxBasedOnAge = Tax.taxesBasedOnAge
    this.currencyFormat = new Intl.NumberFormat('pt-br', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length
    return Math.floor(
      Math.random() * (listLength)
    )
  }

  chooseRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds)
    const carId = carCategory.carIds[randomCarIndex]

    return carId
  }

  async getAvailableCar(carCategory) {
    const carId = this.chooseRandomCar(carCategory)
    const car = await this.carRepository.find(carId)

    return car
  }

  calculateFinalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer
    const price = carCategory.price
    const { then: tax } = this.taxBasedOnAge.find(tax => age >= tax.from && age <= tax.to)

    const finalPrice = ((tax * price) * (numberOfDays))
    const formattedPrice = this.currencyFormat.format(finalPrice)

    return formattedPrice
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory)
    const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays)

    const today = new Date()
    today.setDate(today.getDate() + numberOfDays)
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
    const dueDate = today.toLocaleDateString("pt-br", options)

    const transaction = new Transaction({
      amount: finalPrice,
      car,
      customer,
      dueDate
    })

    return transaction
  }
}

module.exports = CarService