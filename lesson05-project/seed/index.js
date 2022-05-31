const { faker } = require('@faker-js/faker');
const Car = require('./../src/entities/Car')
const CarCategory = require('./../src/entities/CarCategory')
const Customer = require('./../src/entities/Customer')
const { join } = require('path')
const { writeFile } = require('fs/promises')

const seederBaseFolder = join(__dirname, "../", "database")

const CARS_AMOUNT = 2

const carCategory = new CarCategory({
  id: faker.datatype.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = []
const customers = []
for (let index = 0; index <= CARS_AMOUNT; index++) {
  const car = new Car({
    id: faker.datatype.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear()
  })
  carCategory.carIds.push(car.id)
  cars.push(car)

  const customer = new Customer({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    age: faker.datatype.number({ min: 18, max: 50 })
  })
  customers.push(customer)
}


const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data))

  ; (async () => {
    await write('cars.json', cars)
    await write('carCategories.json', [carCategory])
    await write('customers.json', customers)
  })()