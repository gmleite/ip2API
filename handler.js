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
  return res.send(`<!DOCTYPE HTML>
  <html>
  <style>
    body,
    html {
      height: 100%;
    }
  
    body {
      margin: 0px;
    }
  
    
    .hero-image {
     
      background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url("https://content.techgig.com/photo/77087595/Guide-How-to-build-career-as-a-programmer-without-college-degree.jpg");
  
    
      height: 100%;
  
  
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
    }
  
  
  
    .hero-text {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
  
    .button1 {
      display: inline-block;
      padding: 12px 22px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: black;
      background-color: white;
      border: none;
      border-radius: 15px;
      box-shadow: 0 6px #999;
      font-family: "Courier New", "Lucida Console", monospace;
  
    }
  
    .p1 {
      font-family: "Courier New", "Lucida Console", monospace;
    }
  
    .p2 {
      text-align: center;
      font-family: "Courier New", "Lucida Console", monospace;
    }
  
    h1 {
      font-weight: normal;
    }
  
    .column2 {
      float: right;
      width: 25%;
      margin-bottom: 16px;
      padding: 0 52px;
    }
  
    .column {
      float: left;
      width: 25%;
      margin-bottom: 16px;
      padding: 0 52px;
    }
  
    @media screen and (max-width: 650px) {
      .column {
        width: 100%;
        display: block;
      }
    }
  
    .card {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    }
  
    .container {
      padding: 0 18px;
    }
  
    .container::after,
    .row::after {
      content: "";
      clear: both;
      display: table;
    }
  
    .title {
      color: grey;
    }
  
    .button {
      display: inline-block;
      padding: 12px 22px;
      font-size: 14px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: black;
      background-color: white;
      border: none;
      border-radius: 15px;
      box-shadow: 0 6px #999;
      font-family: "Courier New", "Lucida Console", monospace;
    }
  
    .button:hover {
      background-color: #555;
    }
  
    .animate__animated.animate__fadeInLeft {
      --animate-duration: 2s;
      --animate-delay: 0.5s;
    }
    .enviar-image {
      
      background-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8)), url("https://www.apollotechnical.com/wp-content/uploads/2020/08/software-engineer-interview-questions.jpg");
  
      height: 100%;
  
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
    }
  
  
    .enviar-text {
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
    }
    .button3 {
      display: inline-block;
      padding: 8px 16px;
      font-size: 12px;
      cursor: pointer;
      text-align: center;
      text-decoration: none;
      outline: none;
      color: black;
      background-color: white;
      border: none;
      border-radius: 15px;
      box-shadow: 0 6px #999;
      font-family: "Courier New", "Lucida Console", monospace;
    }
  </style>
  
  <head>
    <title>IP2 AWS Services</title>
    <link rel="icon" type="image/png" href="/assets/imgs/favicon-32x32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/assets/imgs/favicon-16x16.png" sizes="16x16" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" />
  </head>
  
  <body>
    <div class="hero-image">
      <div class="hero-text">
        <h1 class="p1">IP2 AWS Services</h1>
        <p class="p1">Um site para utilizar serviços da AWS com facilidade e praticidade.</p>
        <a href="#start" class="button1" onclick=myfunction()>Iniciar</a>
      </div>
    </div>
  
    <div id="start">
      <div class="row">
        <div class="column">
          <div class="card">
            <img src="https://pbs.twimg.com/media/D2Iv_UbX0AAbuqR.jpg" alt="textract" style="width:100%">
            <div class="container">
              <h2>Textract</h2>
              <p class="title">Processamento de Documentos</p>
              <p>Aceita apenas JPEG e PDF's.</p>
              <p>Retorna um arquivo JSON em até 2min. </p>
            </div>
          </div>
        </div>
  
        <div class="column2">
          <div class="card">
            <img src="https://miro.medium.com/max/600/1*0W3bY_v4cor_SC-rx0rA3A.png" alt="rekognition" style="width:93%">
            <div class="container">
              <h2>Rekognition</h2>
              <p class="title">Reconhecimento Facial</p>
              <p>Aceita apenas videos em MP4.</p>
              <p>Retorna um arquivo JSON em até 5min.</p>
            </div>
          </div>
        </div>
        <div style="text-align: center;">
          <h1 class="p2">Serviços Disponiveis</h1>
          <p class="p2">Textract: Faz a leitura de documentos e retorna todas as informaçoes em arquivo JSON.</p>
          <p class="p2">Rekognition: Faz a leitura de videos, retorna as informaçoes desejadas em arquivo JSON.</p>
          <a href="#enviar" class="button">Enviar arquivos</a>
        </div>
      </div>
    </div>
  
  
    <div class="enviar-image" id="enviar">
      <div class="enviar-text">
        <h1 class="p1">Enviar arquivos:</h1>
        <form action='/imgpdf' enctype="multipart/form-data" method="post" class="center">
          <div class="p2">Arquivo: <input type="file" name="someExpressFiles" multiple="multiple" /></div class="center">
          <input type="submit" value="Enviar" class="button3"/>
        </form>
      </div>
    </div>
  
  
  </body>
  <script>
    function myfunction() {
      const elementToAnimate = document.getElementsByTagName('div')[2];
      elementToAnimate.classList.add('animate__animated', 'animate__fadeInLeft');
    }
  </script>`)
  
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
