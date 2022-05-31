const { deepStrictEqual, rejects } = require('assert');
const { constants: { errors }, csvValidation } = require('./src/config.js');
const File = require('./src/file');
const User = require('./src/user.js');

(async () => {
  {
    const filePath = '/mocks/invalidEmpty-file.csv'
    const rejection = new Error(errors.ERR_EMPTY_FILE)
    const result = File.csvToJSON(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = '/mocks/invalidHeaders-file.csv'
    const rejection = new Error(errors.INVALID_CSV_HEADERS)
    const result = File.csvToJSON(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = '/mocks/invalidLinesNumber-file.csv'
    const rejection = new Error(errors.INVALID_CSV_LINE_NUMBER)
    const result = File.csvToJSON(filePath)
    await rejects(result, rejection)
  }
  {
    const filePath = '/mocks/valid-file.csv'
    const expected = [
      new User({
        "id": 1,
        "name": "Vinicius Bass",
        "profession": "Developer",
        "birthYear": 1999
      }),
      new User({
        "id": 2,
        "name": "Bruce Wayne",
        "profession": "Batman",
        "birthYear": 1985
      }),
      new User({
        "id": 3,
        "name": "Rick Ross",
        "profession": "Rich",
        "birthYear": 1940
      })
    ]
    const result = await File.csvToJSON(filePath)
    deepStrictEqual(expected, result)
  }
  // {
  //   const filePath = '/mocks/valid-giant-file.csv'
  //   const expected = [
  //     new User({
  //       "id": 1,
  //       "name": "Vinicius Bass",
  //       "profession": "Developer",
  //       "birthYear": 1999
  //     }),
  //     new User({
  //       "id": 2,
  //       "name": "Bruce Wayne",
  //       "profession": "Batman",
  //       "birthYear": 1985
  //     }),
  //     new User({
  //       "id": 3,
  //       "name": "Rick Ross",
  //       "profession": "Rich",
  //       "birthYear": 1940
  //     })
  //   ]
  //   const result = await File.largeCsvToJSON(filePath)
  //   //deepStrictEqual(expected, result)
  // }
})()