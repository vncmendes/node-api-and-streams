//?search=vini
export function extractQueryParams(query) {
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('=')

    queryParams[key] = value

    return queryParams
  }, {}) //<- inicia um obj vazio. // substr é para tirar a interrogação. aplit é para o caso de ter mais de um paramtro. reduce transforma o array no que quiser, nesse caso um objeto.
}