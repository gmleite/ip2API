const fs = require('fs')
const { stringify } = require('querystring')
const sequelize = require('sequelize')




var id = 1

let cpf = fs.readFileSync(`saved-data/${id}.json`)
let dados = JSON.parse(cpf)
let cpfmetadata = dados["cpf"]

var params = {
    Body: 'saved-data/2.png', 
    Bucket: "examplebucket", 
    Key: "exampleobject", 
    Metadata: {
     "metadata-cpf": `"${cpfmetadata}"`
    }
   }
   s3.putObject(params, function(err, data) {
     if (err) console.log(err, err.stack); // an error occurred
     else     console.log(data);           // successful response
    
     data = {
      ETag: "\"6805f2cfc46c0f04559748bb039d69ae\"", 
      VersionId: "pSKidl4pHBiNwukdbcPXAIs.sshFFOc0"
     }
    
   })
