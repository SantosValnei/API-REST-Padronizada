const roteador = require('express').Router()
const TabelaFornecedor = require('./TabelaFornecedor')
const Fornecedor = require('./Fornecedor')

roteador.get('/', async (requisicao, resposta) => {
    const resutados = await TabelaFornecedor.listar()
    resposta.send(
        JSON.stringify(resutados)
    )
})

roteador.post('/', async (requisicao, resposta) => {
    const dadosRecibidos = requisicao.body
    const fornecedor = new Fornecedor(dadosRecibidos)
    await fornecedor.criar()
    resposta.send(
        JSON.stringify(fornecedor)
    )
    
})

module.exports = roteador