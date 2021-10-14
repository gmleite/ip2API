const fs = require('fs')
const AWS = require('aws-sdk')
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

    presignedurl(id) {
        var s3 = new AWS.S3();

        var presignedGETURL = s3.getSignedUrl('postObject', {
            Bucket: 'ip2-api-dev',
            Key: `${id}.jpeg`, //filename
            Expires: 100 //time to expire in seconds
        })
        return presignedGETURL;
    }
}



