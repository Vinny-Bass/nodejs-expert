module.exports = {
  csvValidation: {
    MAX_LINES: 3,
    HEADERS: ['id', 'name', 'profession', 'birthYear']
  },
  constants: {
    errors: {
      ERR_EMPTY_FILE: 'The file can\'t be empty',
      INVALID_CSV_HEADERS: 'The headers of the csv files are invalid',
      INVALID_CSV_LINE_NUMBER: 'The csv file should not contain more than 3 lines plus header'
    }
  }
}