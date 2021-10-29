const serverless = require("serverless-http");
const express = require("express");
const app = express();
const { pegardatastring, dataFormatada, urlFormatado, saveToDynamoDB } = require('./rotas/datamethod')
const cors = require("cors")
const AWS = require('aws-sdk');
const Busboy = require('busboy');
require('dotenv').config()
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
})
const s3 = new AWS.S3();
var id = pegardatastring()


app.use(cors())



app.get("/", (req, res, next) => {
  return res.send(`<style>
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
  .center2 {
    padding: 8px;
    text-align: center;
  }
  
  </style>
  <div class="header">
      <h1>IP2-TextrAPI</h1>
  </div>
  
  <h2 class="center">JPEG ou PDF para Documentos, Apenas MP4 para videos.</h2>
    <form action='/imgpdf' enctype="multipart/form-data" method="post" class="center">
      <div>Arquivo: <input type="file" name="someExpressFiles" multiple="multiple" /></div class="center">
      <input type="submit" value="Enviar" class="center"/>
    </form>

    <script>
    opcao = document.getElementById('greet').value
    
    </script>
  `)
  
});

app.post('/imgpdf', async (req, res, next) => {

  // MELHOR NAO CUTUCAR
  
  let chunks = [], fname, ftype, fEncoding;
  let busboy = new Busboy({ headers: req.headers });
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {

    console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    fname = filename.replace(/ /g, "_");
    ftype = mimetype;
    extension = ftype.replace('image/', '')
    extension = extension.replace('application/', '')
    extension = extension.replace('video/', '')
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
    var dataFormatad = dataFormatada()
    var urlFormatad = urlFormatado(id, extension)

    saveToDynamoDB(dataFormatad, urlFormatad)

    await new Promise(r => setTimeout(r, 2000))

    var s3file = s3.getSignedUrl('getObject', {
      Bucket: 'ip2-api-dev',
      Key: `${id}.json`,
      Expires: 240
    })


    return res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
        /* Center the loader */
        #loader {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 120px;
        height: 120px;
        margin: -76px 0 0 -76px;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        -webkit-animation: spin 2s linear infinite;
        animation: spin 2s linear infinite;
}

      @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
}

      @keyframes spin {
        0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

        /* Add animation to "page content" */
        .animate-bottom {
        position: relative;
        -webkit-animation-name: animatebottom;
        -webkit-animation-duration: 1s;
        animation-name: animatebottom;
        animation-duration: 1s
}

      @-webkit-keyframes animatebottom {
        from { bottom: -100px; opacity: 0 }
        to { bottom: 0px; opacity: 1 }
}

      @keyframes animatebottom {
        from{ bottom: -100px; opacity: 0 }
        to{ bottom: 0; opacity: 1 }
}

        #myDiv {
        display: none;
        text-align: center;
}
        </style>
      </head>
      <body onload="myFunction()" style="margin:0;">

        <div id="loader"></div>

        <div style="display:none;" id="myDiv" class="animate-bottom">
          <h2><a href='${s3file}'>Download Resultado</a></h2>
          <h2>Caso o link não funcione, espere 30 segundos e tente novamente.</h2>
        </div>

        <script>
          var myVar;

          async function myFunction() {
            myVar = setTimeout(showPage, 8000)
          }

          function showPage() {
            document.getElementById("loader").style.display = "none";
          document.getElementById("myDiv").style.display = "block";
}
        </script>

      </body>
    </html>
`)

  })

  req.pipe(busboy);
  var id = pegardatastring()


})


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
