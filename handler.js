const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { pegardatastring, dataFormatada, urlFormatado, saveToDynamoDB, sendEnd } = require('./rotas/datamethod')
const cors = require("cors")
const AWS = require('aws-sdk');
const Busboy = require('busboy');
const path = require('path');
require('dotenv').config()
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
})
const s3 = new AWS.S3();

app.use(cors())
app.use(express.static("assets"));


app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, '/assets/index.html'))

});



app.post('/upload', async (req, res, next) => {

  // MELHOR NAO CUTUCAR

  let chunks = [], fname, ftype, fEncoding;
  let busboy = new Busboy({ headers: req.headers });
  var id = pegardatastring()
  var userid 
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    fname = filename.replace(/ /g, "_");
    ftype = mimetype;
    var tiposaceitos = ["mp4", "jpeg", "pdf"];
    extension = ftype.replace('image/', '')
    extension = extension.replace('application/', '')
    extension = extension.replace('video/', '')
    fEncoding = encoding;

    if (tiposaceitos.indexOf(extension) !== -1) {
      console.log('Tipo de arquivo aceito!')
    } else {
      res.send(JSON.stringify('Tipo de arquivo nao é aceito, os tipos que podem ser usados sao apenas MP4, PDF ou JPEG.'))
      res.end
    }


    file.on('data', function (data) {
      // you will get chunks here will pull all chunk to an array and later concat it.
      console.log(chunks.length);
      chunks.push(data)
    });
    file.on('end', function () {
      console.log('File [' + filename + '] Finished');
    });
  });
  busboy.on('field', function(fieldname, val) {
    userid = val
    console.log('User id: ' + val + ' sent!')
  });
  busboy.on('finish', async function () {
    const paramss3 = {
      Bucket: 'ip2-api-dev',
      Key: `${id}.${extension}`,
      Body: Buffer.concat(chunks), // concatinating all chunks
      ContentEncoding: fEncoding,
      ContentType: ftype // required
    }
    s3.putObject(paramss3, (err, s3res) => {
      if (err) {
        res.send({ err, status: 'erro!' });
      } else {
        return;
      }
    })
    var identificaçao = userid
    var dataFormatad = dataFormatada()
    var urlFormatad = urlFormatado(id, extension)

    saveToDynamoDB(dataFormatad, urlFormatad, identificaçao)

    await new Promise(r => setTimeout(r, 2000))

    var s3file = s3.getSignedUrl('getObject', {
      Bucket: 'ip2-api-dev',
      Key: `${id}.json`,
      Expires: 240
    })
    
    await new Promise(r => setTimeout(r, 1000))

    var getParams = {
      Bucket: 'ip2-api-dev',
      Key: `${id}.json`
    }
    await sendEnd(getParams)
    res.send(`
            <!DOCTYPE html>
            <html>
            <head> <link rel="stylesheet" href="main.css" /> </head>
                <div style="text-align:center; position:relative;">
                  <h2><a href='${s3file}'>Download Resultado</a></h2>
                  <h2>Caso o link não funcione, espere 30 segundos e tente novamente.</h2>
                </div>
              </body>
            </html>`)
            
  })
  
  req.pipe(busboy);
  


})



app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
