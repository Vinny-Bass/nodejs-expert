import { readFileSync } from 'fs'
import TerminalController from './terminalController.js'
import Person from './person.js'

const database = JSON.parse(
  readFileSync(
    new URL('../database.json', import.meta.url)
  )
)

const DEFAULT_LANG = 'pt-br'
const STOP_TERM = ':q'

const terminalController = new TerminalController()
terminalController.initializeTerminal(database, DEFAULT_LANG)

async function mainLoop() {
  try {
    const answer = await terminalController.question()
    if (answer === STOP_TERM) return terminalController.closeTerminal()
    const person = Person.generateInstanceFromString(answer)
    terminalController.updateTable(person.formatted())

    return mainLoop()
  } catch (err) {
    console.log(err)
    return mainLoop()
  }
}

await mainLoop()