const mongoose = require('mongoose')

module.exports = (app) => {

    const ProdutoController = {

        //Aqui dentro ficarão nossas APIS! .. o/

        cadastrar (request, response) {

            const Produto = app.models.produtos
            const produto = new Produto(request.body)

            if (!produto.dataHoraCadastro) {
                //Se não for definido a hora e data, ele deverá
                //cadastrar a data do servidor.
                produto.dataHoraCadastro = new Date();
            }

            

            mongoose.connect(
                'mongodb://localhost:27017/produtos',
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            ).then(
                (resultado) => {
                    console.log('Conexão com o mongoDB realizada !..')
                    if (request.body.codigo == false) {
                        console.log(`resultado foi ${request.body.codigo}`)
                        mongoose.disconnect()
                        response.status(400).send(resultado)
                    }
                    
                    const resultadoCreate = Produto.create(produto)
                    .then((resultado) => {
                        console.log(resultado)
                        console.log(`O ${produto.descricao} foi cadastrado com sucesso.`)
                        mongoose.disconnect()
                        response.status(200).send(resultado)
                    })
                    .catch((erro) => {
                        console.log(erro)
                        console.log(`Erro ao cadastrar o produto '${produto.descricao}': ${erro}`)
                        mongoose.disconnect()   
                        response.status(500).send(`Erro ao cadastrar o produto '${produto.descricao}': ${erro}`)
                    })
                }
            ).catch(
                (erro) => {
                    console.log(`erro do connection: ${erro} | constructor: ${erro.constructor.name}`);
                    console.log(erro);
                    console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                    response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);     
                }
            )

        },
        alterar(request, response) {
             //informando que a rota alterar foi chamada
             console.log("Rota PUT/ ALTERAR produto chamada")
             console.log(request.params)

            mongoose.connect(
                'mongodb://localhost:27017/produtos',
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            )
            .then(() => {
                
                const Produto = app.models.produtos
                Produto.updateOne(
                    
                    { preco: request.params.preco }
                )
                .then((resultadoAlterarProduto) => {
                    console.log(resultadoAlterarProduto)
                    mongoose.disconnect()
                    if(resultadoAlterarProduto.deletedCount > 0) {
                        response.status(200).send(`Produto selecionado foi alterado`)
                    }else {
                        response.status(404).send("Produto não foi localizado")
                    }
                })
                .catch((erro) => {
                    console.log(`Erro ao alterar o documento : ${erro}`)
                    console.log(erro)
                    mongoose.disconnect()
                    response.status(500).send(`erro ao alterar o documento: ${erro}`)
                })
            })
            .catch((erro) => {
                console.log("Erro ao conectar no mongo")
                console.log(erro)
                response.status(500).send('Erro ao conectar no mongoo')
            })
    },
    pesquisar (request, response) {
        console.log('rota pesquisar chamada')

        mongoose.connect(
            'mongodb://localhost:27017/produtos',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        )
        .then(() => {

            const Produto = app.models.produtos

            Produto.findOne(
                { codigo: request.params.codigo }
            )
            .then((resultadoPesquisar) => {
                console.log(resultadoPesquisar)
                mongoose.disconnect()
            })
            .catch((erro) => {
                console.log("Erro consultar documento")
                console.log(erro)
                mongoose.disconnect()
                response.status(500).send('Erro')
            })
        }).catch((erro) => {
            console.log("Erro ao conectar no mongo")
            console.log(erro)
            response.status(500).send('Erro ao conectar no mongoo')
        })
    }


}
    return ProdutoController

}