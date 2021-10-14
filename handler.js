const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { pegardatastring, uploadimgs3, pdftoimg, uploads3, presignedurl } = require('./rotas/datamethod')
var path = require('path')
const cors = require("cors")

app.use(cors())
var id = pegardatastring()


app.get("/", (req, res, next) => {
  return res.send(`
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
    <form action="/imgpdf" enctype="multipart/form-data" method="post" class="center">
      <div>Arquivo: <input type="file" name="someExpressFiles" multiple="multiple" /></div class="center">
      
      <input type="submit" value="Enviar" class="center"/>
    </form>
  `)
});

app.post('/imgpdf', async (req, res, next) => {
  try {
    const urlpres = presignedurl(id)
    res.status(201)
    res.send()
  } catch (erro) {
    console.log(erro)
    res.send(JSON.stringify(erro))
  }

})

app.get("/hello", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
