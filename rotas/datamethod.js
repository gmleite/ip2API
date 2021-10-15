const fs = require('fs')
const AWS = require('aws-sdk')
AWS.config.update({
    accessKeyId: 'AKIA6LVBLYD6GA5QRK3P',
    secretAccessKey: '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',
    region: 'us-east-1'
})
const { AWS_ACESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env



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
    /*uploads3seilacomo() {

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
        busboy.on('finish', function () {
            const userId = UUID();
            const params = {
                Bucket: 'ip2-api-dev',
                Key: `${userId}-${fname}`,
                Body: Buffer.concat(chunks), // concatinating all chunks
                ACL: 'public-read',
                ContentEncoding: fEncoding,
                ContentType: ftype // required
            }

            S3.upload(params, (err, s3res) => {
                if (err) {
                    res.send({ err, status: 'error' });
                } else {
                    res.send({ data: s3res, status: 'success', msg: 'Image successfully uploaded.' });
                }
            });

        });
        req.pipe(busboy);

    }*/
}





