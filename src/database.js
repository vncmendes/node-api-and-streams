import fs from 'node:fs/promises' // fs file system para salvar as informações em arquivo.

const databasePath = new URL('../db.json', import.meta.url)

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
        this.#database = JSON.parse(data)
      })
      .catch(() => {
        this.#persist()
      })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data) //se já existir uma array, irá só inserir as informações [data]
    } else {
      this.#database[table] = [data] //se não existir o array ainda, irá criar.
    }

    this.#persist();
    return data;
  }
}