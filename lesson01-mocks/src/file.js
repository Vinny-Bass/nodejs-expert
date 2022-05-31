const { readFile } = require('fs/promises')
const { createReadStream } = require('fs')
const { PassThrough } = require('stream')
const Throttle = require('throttle')
const { join } = require('path')
const { constants: { errors }, csvValidation } = require('./config.js')
const User = require('./user.js')

class File {

  static async csvToJSON(path) {
    const content = await File.getFileContent(path)
    const error = File.isValid(content)
    if (error) throw new Error(error)

    return File.parseCSVtoJSON(content)
  }

  static async largeCsvToJSON(path) {
    const stream = await File.getLargeFileContent(path)
    const finalFileData = []
    stream.pipe(new Throttle(10))
    stream.on('data', (data) => {
      const content = data.toString()
      console.log({ content })
      const error = File.isValid(content)

      if (error) throw new Error(error)

      finalFileData.push(File.parseCSVtoJSON(content))
    })
    return finalFileData
  }

  static parseCSVtoJSON(csvString) {
    const lines = csvString.split('\n')
    const firstLine = lines.shift()
    const headers = firstLine.split(',')
    const users = lines.map((line) => {
      const columns = line.split(',')
      let user = {}
      for (const index in columns) {
        user[headers[index]] = columns[index]
      }
      return new User(user)
    })
    return users
  }

  static async getFileContent(path) {
    const root = join(__dirname, '../')
    const finalPath = join(root, path)
    return (await readFile(finalPath)).toString('utf-8')
  }

  static async getLargeFileContent(path) {
    const root = join(__dirname, '../')
    const finalPath = join(root, path)
    return createReadStream(finalPath, { bufferSize: 10 * 1024 })
  }

  static isValid(csvString, options = csvValidation) {
    const [headers, ...data] = csvString.split('\n')
    const isHeadersValid = headers == options.HEADERS.join(',')
    let error = null

    if (!isHeadersValid) {
      error = errors.INVALID_CSV_HEADERS
    }

    if (data.length === 0) {
      error = errors.ERR_EMPTY_FILE
    }

    if (data.length > 3) {
      error = errors.INVALID_CSV_LINE_NUMBER
    }

    return error
  }

  static parseData

}

module.exports = File