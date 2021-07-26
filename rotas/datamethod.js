const fs = require('fs')
const { start } = require('repl')
const { finished } = require('stream')
const AWS = require('aws-sdk')

var s3 = new AWS.S3()



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

    let cpf = cpfrecebido
    
    var params = {
        Body: `./saved-data/${id}.png`, 
        Bucket: "examplebucket", 
        Key: "exampleobject", 
        Metadata: {
         "metadata-cpf": `"${cpf}"` 
        }
       }
       s3.putObject(params, function(err, data) {
         if (err) console.log(err, err.stack)
         else     console.log(data)        
        
         data = {
          ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
          VersionId: "pSKidl4pHBiNwukdbcPXAIs.sshFFOc0"
         }
        
       })
    
    }
}


