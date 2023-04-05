import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { Database } from './database.js'
import { json } from './middlewares/json.js'

//  {
// // - Criar Usuários
// // - Listagem de Usuários
// // - Edição de Usuários
// // - Remoção de Usuários

// // - HTTP
// //   - METHOD
// //   - URL

// // - GET, POST, PUT, PATCH, DELETE

// // GET => Busca um recurso no back-end.
// // POST => Cria um recurso no back-end.
// // PUT => Atualiza um ou mais recursos no back-end, como um formulário.
// // PATCH => Atualiza uma informação específica em um recurso no back-end.
// // DELETE => Remove um recusos do back-end.

// // GET/users => Busca os usuários do back-end na rota.
// // POST/users => Cria um usuário no back-end na rota.

// // Stateful - Aplicação que quando é reiniciada os dados não persistem.
// // Stateless - Aplicação que quando é reiniciada as informações ficam persistidas em um banco de dados.

// // Cabeçalhos - (Requisição/Resposta) => Metadados.

// // HTTP Status Code
//  }

const database = new Database()

const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req, res)

  if (method === "GET" && url === "/users") {
    const users = database.select('users')

    return res.end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    const { id, name, email } = req.body

    const user = {
      id: randomUUID(),
      name,
      email,
    }

    database.insert('users', user)

    return res.writeHead(201).end()
  }
  return res.writeHead(404).end('Not Found.')
})

server.listen(3333)