const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const roteador = require('./rotas/index')
const cors = require("cors")

app.use(cors())

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))

app.use(bodyParser.json())


app.use('/api', roteador)

app.listen(8080, () => console.log('API Rodando.'))






