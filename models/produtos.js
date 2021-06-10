const { request } = require('express')

const mongoose = require('mongoose')

module.exports = (app) => {

    //Definindo os Schemas da classe de conforme enunciado

    const Schema = mongoose.Schema

    const produtoSchema = Schema(
        //Definindo a estrutura da coleção
        {
            codigo: {type: Number, required: true, index: { unique: true }},
            descricao: { type: String, required: true },
            preco: { type: Number, required: true },
            dataHoraCadastro: { type: Date, required: true },
            dataHoraAtualizacao: { type: Date }

        }

    )

        const Produto = mongoose.model('produtos', produtoSchema )
        return Produto

}