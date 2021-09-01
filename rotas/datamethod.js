const fs = require('fs')
const { start } = require('repl')
const { finished } = require('stream')
const AWS = require('aws-sdk')
const path = require('path')
const { fromPath } = require('pdf2pic')
AWS.config.update({
    accessKeyId: 'AKIA6LVBLYD6GA5QRK3P',
    secretAccessKey: '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',
    region: 'us-east-1'
})
const { AWS_ACESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env



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
        const s3 = new AWS.S3()
        const filecontent = fs.readFileSync(`./saved-data/${id}.jpeg`)

        var params = {
            Body: filecontent,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg',
            Bucket: "ip2-api-dev",
            Key: `${id}.jpeg`,
        }
        s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)

        })
    },
    uploadimgs3(id) {
        const s3 = new AWS.S3()
        const filecontent = fs.readFileSync(`saved-data/${id}.1.jpeg`)
        var params = {
            Body: filecontent,
            Bucket: "ip2-api-dev",
            Key: `${id}.jpeg`,
        }
        s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)

        })

    },
    runtextract(id) {
        var textract = new AWS.Textract()
        var params = {
            Document: {
                S3Object: {
                    Bucket: 'ip2-api-dev',
                    Name: `${id}.jpeg`
                }
            },
            FeatureTypes: [
                "TABLES", "FORMS"
            ]
        }
        textract.analyzeDocument(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else fs.writeFileSync(`./saved-data/${id}.json`, JSON.stringify(data), (err) => {
                if (err) throw err
            })
            console.log('JSON Criado!')
        });
    },
    pdftoimg(id) {
        const options = {
            density: 300,
            saveFilename: `${id}`,
            savePath: "saved-data/",
            format: "jpeg",
            width: 2480,
            height: 3508
        };
        const storeAsImage = fromPath(`saved-data/${id}.pdf`, options);
        const pageToConvertAsImage = 1;

        storeAsImage(pageToConvertAsImage).then((resolve) => {
            console.log("Convertido para imagem.");

            return resolve;
        });

    },
    uploadjsons3(id) {
        const s3 = new AWS.S3()
        const filecontent = fs.readFileSync(`saved-data/${id}.json`)
        var params = {
            Body: filecontent,
            Bucket: "ip2-api-dev",
            Key: `${id}.json`,
        }
        s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack)
            else console.log(data)

        })
    },
    limpararquivos(id) {
        fs.unlink(`saved-data/${id}.pdf`, (err) => {
            if (err) console.log(err)
            else console.log('PDF Deletado')
        })
        fs.unlink(`saved-data/${id}.1.jpeg`, (err) => {
            if (err) console.log(err)
            else console.log('JPEG Deletado')
        })
    }
}



