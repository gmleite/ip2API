const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { pegardatastring, uploadimgs3, pdftoimg, uploads3, presignedurl } = require('./rotas/datamethod')
var path = require('path')
const cors = require("cors")
const AWS = require('aws-sdk')

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
  const bodyreq = req.body
  var s3 = new AWS.S3();
  function base64_encode(bodyreq) {

    var bitmap = bodyreq;
    return new Buffer.from(bitmap).toString('base64');
  }
  console.log("Starting File saving!");
  var buf = base64_encode(bodyreq)
  var params = { Bucket: 'ip2-api-dev', Key: `${id}.jpeg`, Body: buf, ContentEncoding: 'image/jpeg' };

  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('succesfully uploaded the image!');
    }
  });

})


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
