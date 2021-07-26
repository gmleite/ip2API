const roteador = require('express').Router()
const dados = require('./datamethod')
const fs = require('fs')
const { inserir, b64toimg, clear, find, atualizarid, pegarid, uploads3 } = require('./datamethod')



roteador.get('/', async (req, res)=>{
    const resultados = await dados.listar()
    res.status(200)
    res.send(
        JSON.stringify(resultados)
    )
})

roteador.post('/', async (req, res)=>{
    var id = pegarid()
    const dadosrecebidos = req.body
    const cpfrecebido = dadosrecebidos["cpf"]
    const dados = JSON.stringify(dadosrecebidos)
    await inserir(dados, id, req, res)
    b64toimg(dadosrecebidos, id, req, res)
    uploads3(id, cpfrecebido)
    id ++
    atualizarid(id)
    })

roteador.delete('/:id', async (req, res)=>{
    const id = req.params.id
    clear(id)
    res.send(200)
    res.end
    })

roteador.get('/:id', async (req, res)=>{
    const id = req.params.id
    find(id, req, res)
})
    



module.exports = roteador



