const modelotabela = require('../rotas/modelotabela')

modelotabela
    .sync()
    .then(()=> console.log('Tabela criada com sucesso.'))
    .catch(console.log)