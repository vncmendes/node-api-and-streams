import http from 'node:http'
import { Transform } from 'node:stream';

class TransformNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1
    callback(null, Buffer.from(String(transformed))) // primeiro parametro é o erro, pode testar com um if para ver se é um numero mesmo.
    console.log(transformed);
  }
}

// req = ReadableStream
// res = WritableStream

// função que está esperando todo requisição chegar para continuar.
const server = http.createServer(async (req, res) => {
  const buffers = []

  for await (const chunk of req) {
    buffers.push(chunk)
  }

  const fullStreamContent = Buffer.concat(buffers).toString()

  console.log(fullStreamContent);

  return res.end(fullStreamContent)
})

// função padrão recebendo as informações e processando aos poucos - streams
// const server = http.createServer(async (req, res) => {
//   return req
//     .pipe(new TransformNumberStream())
//     .pipe(res)
// })

server.listen(3334)