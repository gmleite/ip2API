const roteador = require('express').Router()
const dados = require('./datamethod')
const fs = require('fs')
const { inserir, b64toimg, clear, find, atualizarid, pegarid, uploads3, pegardatastring } = require('./datamethod')



roteador.get('/', async (req, res) => {
    res.end
})

roteador.post('/', async (req, res) => {
    var id = pegardatastring()
    const dadosrecebidos = req.body
    const cpfrecebido = dadosrecebidos["cpf"]
    b64toimg(dadosrecebidos, id, req, res)
    uploads3(id, cpfrecebido)
    res.status(201)
})


roteador.get('/:id', async (req, res) => {
    const id = req.params.id
    find(id, req, res)
})




module.exports = roteador



