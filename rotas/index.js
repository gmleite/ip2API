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

roteador.get('/', (req, res) => {
    res.send(`
    <style>
    .header {
        padding: 80px;
        text-align: center;
        background: #5d5b5b;
        color: white;
    }
    .center {
        padding: 4px;
        text-align: center;
      }
    
    </style>
    <div class="header">
        <h1>IP2-TextrAPI</h1>
    </div>
    <h2 class="center"> Apenas PDF</h2>
      <form action="/api/imgpdf" enctype="multipart/form-data" method="post" class="center">
        <div>Arquivo: <input type="file" name="someExpressFiles" multiple="multiple" /></div class="center">
        
        <input type="submit" value="Enviar" class="center"/>
      </form>
    `)
  })


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

roteador.post('/imgpdf', upload.single('someExpressFiles'), async (req, res) => {
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
