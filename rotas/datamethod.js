const fs = require('fs')
const { start } = require('repl')
const { finished } = require('stream')
const AWS = require('aws-sdk')


module.exports={

inserir(dadosrecebidos, id, req, res){
        fs.writeFile(`./saved-data/${id}.json`,dadosrecebidos, (erro, resultado)=>{
            if(erro){
                console.log(erro)
            }else{
                res.status(201)
                res.send(JSON.stringify(dadosrecebidos))
            }})
},
b64toimg(dadosrecebidos, id, req, res){    
    var buf = Buffer.from(`${dadosrecebidos["imagem"]}`, 'base64')
    fs.writeFileSync(`./saved-data/${id}.png`, buf)},

clear(id){
    try{
        fs.unlinkSync(`./saved-data/${id}.json`)
        fs.unlinkSync(`./saved-data/${id}.png`)
    }catch(erro){
        console.log(erro)
    }

},
find(id, req, res){
    var cpf = fs.readFileSync(`saved-data/${id}.json`)
    let dados = JSON.parse(cpf)
    res.status(201)
    res.send(JSON.stringify(dados["cpf"]))

},
pegarid(){
    var idraw = fs.readFileSync(`rotas/dados/id.json`)
    let idatualizado = JSON.parse(idraw)
    return idatualizado["id"]
},
atualizarid(id){
    fs.writeFileSync('rotas/dados/id.json', `{"id":${id}}`)
},
uploads3(id, cpfrecebido){
    const {AWS_ACESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

    AWS.config.update({
    accessKeyId: 'AKIA6LVBLYD6GA5QRK3P',
    secretAccessKey: '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',
    region: 'us-east-1'
    })
    
    const s3 = new AWS.S3()
    const filecontent = fs.readFileSync(`./saved-data/${id}.png`)
    let cpf = cpfrecebido
    
    var params = {
        Body: filecontent, 
        ContentEncoding: 'base64',
        ContentType: 'image/png',
        Bucket: "skill-hive-face", 
        Key: `source/${id}.png`, 
        Metadata: {
         "cpf": `${cpf}`
        }
       }
       s3.putObject(params, function(err, data) {
         if (err) console.log(err, err.stack)
         else     console.log(data)
         
       })
    }
}


