const express   = require('express');
const config	= require('./../config.json')

const routes	= require('./routes')

const server 	= express()


server.use(routes)

if (server.listen(config.port)) {
	console.log("Servidor rodando na porta " + config.port)
}