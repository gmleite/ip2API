const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const roteador = require('./rotas/index')
const aws = require('aws-sdk')



app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({limit:'50mb'}))

app.use(bodyParser.json())

app.use('/api/facialrec', roteador)

app.listen(config.get('api.porta'), () => console.log('API Rodando.'))



