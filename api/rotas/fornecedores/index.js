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

roteador.get('/:idFornecdor', async (requisicao, resposta) => {
    try {
        const id = requisicao.params.idFornecdor
        const fornecedor = new Fornecedor({id: id})
        await fornecedor.carregar()
        resposta.send(
            JSON.stringify(fornecedor)
        )
    } catch (erro) {
        resposta.send(
            JSON.stringify({
                mensagem: erro.message
            })
        )
    }
})

module.exports = roteador