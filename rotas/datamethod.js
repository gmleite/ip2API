const fs = require('fs')
const AWS = require('aws-sdk')
const Busboy = require('busboy');
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
    uploads3(id, bodyreq) {
        try {
            const body = JSON.parse(bodyreq)

            if (!body || !body.image || !body.mime) {
                return res.send(400)
            }
            if (!allowedMimes.includes(body.mime)) {
                return res.send(400)
            }

            let imageData = body.image
            var buf = Buffer.from(imageData, 'base64')

            var params = {
                Body: buf,
                ContentEncoding: 'base64',
                ContentType: 'image/jpeg',
                Bucket: "ip2-api-dev",
                Key: `${id}.jpeg`,

            }
            s3.putObject(params, function (err, data) {
                if (err) console.log(err, err.stack)
                else console.log(data)

            })


        } catch (error) {
            res.send(error)
        }
    },
}





