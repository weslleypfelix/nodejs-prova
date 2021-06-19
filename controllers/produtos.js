const mongoose = require('mongoose')

module.exports = (app) => {

    const ProdutoController = {

        //Aqui dentro ficarão nossas APIS! .. o/

        cadastrar (request, response) {

            const Produto = app.models.produtos
            const produto = new Produto(request.body)

            //Buscando código do produto 

            let codigo
            codigo = parseInt(produto.codigo)
            produto.codigo = codigo

            //Buscando Código do preço

            let preco
            preco = produto.preco

            
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

                    if (codigo <= 0 ) {
                        console.log(`resultado foi ${produto.codigo}`)
                        mongoose.disconnect()
                        response.status(400).send(`Não é possível cadastrar um número 0 ou negativo`)
                    }

                    if (codigo % 2 == 1) {
                        console.log(`resultado foi ${produto.codigo}`)
                        mongoose.disconnect()
                        response.status(400).send(`Não é possível cadastrar um numero decimal`)
                    }

                    if (preco <= 0) {
                        console.log(`resultado foi ${produto.preco}`)
                        mongoose.disconnect()
                        response.status(400).send(`Não é possível cadastrar um preco zerado ou negativo`) 
                    }

                    if (produto.codigo == false) {
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
             
            //1° Pegar o Schema de produto

            const Produto = app.models.produtos


            mongoose.connect(
                'mongodb://localhost:27017/produtos',
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            )
            .then(() => {
                
                if (request.body.preco > 0) {
                Produto.updateOne(
                    
                    { codigo: request.params.codigo },
                    {
                        $set: {
                            preco : request.body.preco,
                            dataHoraAtualizacao : new Date
                        }
                    }
                )
                .then((resultadoAlterarProduto) => {
                    if(resultadoAlterarProduto.nModified > 0) {
                            
                        response.status(200).send(`produto  atualizado  com sucesso! .. Preço: ${request.params.preco}`)
                        mongoose.disconnect()
                    }else{
                        response.status(500).send("produto  nao  encontrado verifique codigo produto ")
                        mongoose.disconnect()
                    }
                })
                .catch((erro) => {
                    response.status(500).send(`nao atualizado ${erro}` )
                    mongoose.disconnect()
                })
            }})
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