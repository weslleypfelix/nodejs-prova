
module.exports = (app) => {

    app.put('/produto/:codigo', app.controllers.produtos.alterar)  

    app.post('/produto', app.controllers.produtos.cadastrar);

    // app.put('/produto/:codigo/preco', app.controllers.produtos.alterar)

    app.get("/produto/:codigo", app.controllers.produtos.pesquisar)
}