const express	= require('express')
const config	= require('./../config.json')


const server 	= express()


server.get('/', (request, response)=>{
	response.send("Olá, bem vindo!")
})

if (server.listen(config.port)) {
	console.log("Servidor rodando na porta " + config.port)
}