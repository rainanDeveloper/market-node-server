const express		= require('express')

// Importação dos módulos
const venda			= require('./controllers/venda')
const financeiro	= require('./controllers/financeiro')

const routes		= express.Router()

routes.get('/', (request, response)=>{
	response.sendFile('static-pages/main.html', {root: __dirname})
})

module.exports = routes