const fs = require('fs')
const { start } = require('repl')
const { finished } = require('stream')
const AWS = require('aws-sdk')
const path = require('path')


module.exports = {

    b64toimg(dadosrecebidos, id, req, res) {
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
    uploads3(id, cpfrecebido) {
        const { AWS_ACESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

        AWS.config.update({
            accessKeyId: 'AKIA6LVBLYD6GA5QRK3P',
            secretAccessKey: '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',
            region: 'us-east-1'
        })

        const s3 = new AWS.S3()
        const filecontent = fs.readFileSync(`./saved-data/${id}.jpeg`)
        let cpf = cpfrecebido

        var params = {
            Body: filecontent,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg',
            Bucket: "ip2-api-dev",
            Key: `source/${id}.jpeg`,
            Metadata: {
                "cpf": `${cpf}`
            }
        }
        s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)

        })
    },
    uploadtextbreaks3(id) {
        const { AWS_ACESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

        AWS.config.update({
            accessKeyId: 'AKIA6LVBLYD6GA5QRK3P',
            secretAccessKey: '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',
            region: 'us-east-1'
        })

        const s3 = new AWS.S3()
        const filecontent = fs.readFileSync(`./saved-data/${id}.jpeg`)

        var params = {
            Body: filecontent,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg',
            Bucket: "ip2-api-dev",
            Key: `source/${id}.jpeg`,
        }
        s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)

        })
    },
    uploadimgs3(id, file) {
        const { AWS_ACESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env

        AWS.config.update({
            accessKeyId: 'AKIA6LVBLYD6GA5QRK3P',
            secretAccessKey: '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',
            region: 'us-east-1'
        })
        const s3 = new AWS.S3()
        const filecontent = fs.readFileSync(`saved-data/${id}.pdf`)
        var params = {
            Body: filecontent,
            Bucket: "ip2-api-dev",
            Key: `source/${id}.pdf`,
        }
        s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)

        })

    }
}


