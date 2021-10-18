const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { pegardatastring, uploadimgs3, pdftoimg, uploads3, presignedurl } = require('./rotas/datamethod')
const cors = require("cors")
const AWS = require('aws-sdk');
const Busboy = require('busboy');
AWS.config.update({
  accessKeyId: 'AKIA6LVBLYD6GA5QRK3P',
  secretAccessKey: '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',
  region: 'us-east-1'
})
const { AWS_ACESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

const s3 = new AWS.S3();

var id = pegardatastring()


app.use(cors())



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
  <h2 class="center"> Apenas JPEG.</h2>
    <form action="/imgpdf" enctype="multipart/form-data" method="post" class="center">
      <div>Arquivo: <input type="file" name="someExpressFiles" multiple="multiple" /></div class="center">
      
      <input type="submit" value="Enviar" class="center"/>
    </form>
  `)
});

app.post('/imgpdf', async (req, res, next) => {
  // nao sei como funciona mas funciona, envia a imagem pro s3
  let chunks = [], fname, ftype, fEncoding;
  let busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    fname = filename.replace(/ /g, "_");
    ftype = mimetype;
    fEncoding = encoding;
    file.on('data', function (data) {
      // you will get chunks here will pull all chunk to an array and later concat it.
      console.log(chunks.length);
      chunks.push(data)
    });
    file.on('end', function () {
      console.log('File [' + filename + '] Finished');
    });
  });
  busboy.on('finish', async function () {
    const params = {
      Bucket: 'ip2-api-dev',
      Key: `${id}.jpeg`,
      Body: Buffer.concat(chunks), // concatinating all chunks
      ContentEncoding: fEncoding,
      ContentType: ftype // required
    }


    s3.putObject(params, (err, s3res) => {
      if (err) {
        res.send({ err, status: 'erro!' });
      } else {
        return
      }
    });
    await new Promise(r => setTimeout(r, 4000))
    var s3file = s3.getSignedUrl('getObject', {
      Bucket: 'ip2-api-dev',
      Key: `${id}.json`,
      Expires: 100
    })

    return res.send(`<a href='${s3file}'>Download Resultado</a>`)

  })

  req.pipe(busboy);


})


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
