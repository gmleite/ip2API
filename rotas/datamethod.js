const fs = require('fs')
const AWS = require('aws-sdk')
const uuid = require('uuid')
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: process.env.region
})
const s3 = new AWS.S3()



module.exports = {

  b64toimg(dadosrecebidos, id,) {
    var buf = Buffer.from(`${dadosrecebidos["imagem"]}`, 'base64')
    fs.writeFileSync(`./saved-data/${id}.jpeg`, buf)
  },
  pegardatastring() {
    const date = new Date()
    const year = date.getFullYear()
    const month = `${date.getMonth() + 1}`.padStart(2, '0')
    const day = `${date.getDate()}`.padStart(2, '0')
    const seconds = `${date.getSeconds()}`.padStart(2, '0')
    return `${year}${month}${day}${seconds}`

  },
  dataFormatada() {
    let date_ob = new Date();

    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    return dataFormatada = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  },
  urlFormatado(id, extension) {
    return location = `https://s3.console.aws.amazon.com/s3/object/ip2-api-dev?region=us-east-1&prefix=${id}.${extension}`
  },
  saveToDynamoDB(dataFormatad, urlFormatad, identificaçao) {
    const dynamodb = new AWS.DynamoDB();

    AWS.config.setPromisesDependency(require('bluebird'));

    var paramsdb = {
      TableName: "ip2-api-TimeDynamoDbTable",
      Item: {
        'data': {
          S: dataFormatad
        },
        'localizaçao': {
          S: urlFormatad
        },
        'identificaçao':{
          S:identificaçao
        }
      }
    }
    dynamodb.putItem(paramsdb, function (err, data) {
      if (err) console.log(err, err.stack)
      else console.log('Enviado para dynamoDB')
    })
  },
  async sendEnd(getParams) {
    var timeout = 0
    var found = false
    while (found === false && timeout <= 29) {
      timeout = timeout + 3
      await new Promise(r => setTimeout(r, 2000))
      s3.headObject(getParams, function (err, metadata) {
        if (err && err.code === 'NotFound') {
          console.log('not found')
        } else {
          found = true
          console.log('found!')
        }
      })
    }
  }
}





