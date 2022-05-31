class User {
  constructor({ id, name, profession, birthYear }) {
    this.id = parseInt(id)
    this.name = name
    this.profession = profession
    this.birthYear = parseInt(birthYear)
  }
}

module.exports = User