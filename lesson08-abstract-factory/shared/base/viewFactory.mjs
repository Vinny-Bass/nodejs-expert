import NotImplementedException from "../notImplementedException.mjs";


//Interface simulada no node
export default class ViewFactory {
  createTable() {
    throw new NotImplementedException(this.createTable.name)
  }
}