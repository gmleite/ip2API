const roteador = require('express').Router()
const { b64toimg, uploads3, pegardatastring, uploadimgs3, pdftoimg, limpararquivos } = require('./datamethod')
const multer = require('multer')
var path = require('path')
var id = pegardatastring()
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'saved-data/')
    },
    filename: function (req, file, cb) {
        cb(null, id + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storage })


roteador.post('/text', async (req, res) => {
    try {
        var id = pegardatastring()
        const dadosrecebidos = req.body
        b64toimg(dadosrecebidos, id, req, res)
        uploads3(id)
        res.send('Enviado com sucesso.')
        res.status(201)
    } catch (erro) {
        res.send(JSON.stringify(erro))
        res.status(400)
    }
})

roteador.post('/imgpdf', upload.single('formImage'), async (req, res) => {
    try {
        console.log(req.file)
        await pdftoimg(id)
        await new Promise(r => setTimeout(r, 5000))
        uploadimgs3(id)
        await new Promise(r => setTimeout(r, 4000))
        await limpararquivos(id)
        id = pegardatastring()
        res.status(201)
        res.send('PDF Recebido!')
    } catch (erro) {
        console.log(erro)
        res.send(JSON.stringify(erro))
    }

})




module.exports = roteador
