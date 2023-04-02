import http from 'node:http'

// - Criar Usuários
// - Listagem de Usuários
// - Edição de Usuários
// - Remoção de Usuários

// - HTTP
//   - METHOD
//   - URL

// - GET, POST, PUT, PATCH, DELETE

// GET => Busca um recurso no back-end.
// POST => Cria um recurso no back-end.
// PUT => Atualiza um ou mais recursos no back-end, como um formulário.
// PATCH => Atualiza uma informação específica em um recurso no back-end.
// DELETE => Remove um recusos do back-end.

// GET/users => Busca os usuários do back-end na rota.
// POST/users => Cria um usuário no back-end na rota.

// Stateful - Aplicação que quando é reiniciada os dados não persistem.
// Stateless - Aplicação que quando é reiniciada as informações ficam persistidas em um banco de dados.

// Cabeçalhos - (Requisição/Resposta) => Metadados.

// HTTP Status Code

const users = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === "GET" && url === "/users") {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users))
  }

  if (method === 'POST' && url === '/users') {
    users.push(
      {
        id: 1,
        nome: 'Vini Mendes',
        email: 'vinimendes@example.com'
      }
    )
    return res.writeHead(201).end()
  }
  return res.writeHead(404).end('Not Found.')
})

server.listen(3333)