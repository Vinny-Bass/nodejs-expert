const https = require('https')

class Service {
  async makeRequest(url) {
    return new Promise((resolve, reject) => {
      https.get(url, response => {
        response.on("data", data => resolve(JSON.parse(data)))
        response.on("error", reject)
      })
    })
  }

  async getPeople(url) {
    const response = await this.makeRequest(url)

    return {
      name: response.name,
      mass: response.mass
    }
  }
}

module.exports = Service