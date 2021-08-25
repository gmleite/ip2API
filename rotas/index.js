const roteador = require('express').Router()
const dados = require('./datamethod')
const fs = require('fs')
const { inserir, b64toimg, clear, find, atualizarid, pegarid, uploads3, pegardatastring, uploadtextbreaks3, savearq } = require('./datamethod')
const multer = require('multer')
var path = require('path')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'saved-data/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


roteador.get('/facialrec', async (req, res) => {
    res.end
})

roteador.post('/facialrec', async (req, res) => {
    try {
        var id = pegardatastring()
        const dadosrecebidos = req.body
        const cpfrecebido = dadosrecebidos["cpf"]
        b64toimg(dadosrecebidos, id, req, res)
        uploads3(id, cpfrecebido)
        res.status(201)
    } catch (erro) {
        res.send(JSON.stringify(erro))
        res.status(400)
    }

})

roteador.post('/text', async (req, res) => {
    try {
        var id = pegardatastring()
        const dadosrecebidos = req.body
        b64toimg(dadosrecebidos, id, req, res)
        uploadtextbreaks3(id)
        res.send('Enviado com sucesso.')
        res.status(201)
    } catch (erro) {
        res.send(JSON.stringify(erro))
        res.status(400)
    }
})

roteador.post('/img', upload.single('formImage'), async (req, res) => {
    console.log(req.file)
    res.status(201)
    res.send('Enviado.')
})




module.exports = roteador