const { response } = require("express")
const { request } = require("http")

module.exports = (app) => {

    app.get('/produto/:codigo', (request, response) => {
        console.log('Rota pesquisa..! ')
        response.status(200).send('Acessado com sucesso')
    })

    app.post('/produto', app.controllers.produtos.cadastrar);

    app.put('/produto/:codigo/preco', app.controllers.produtos.alterar)

}