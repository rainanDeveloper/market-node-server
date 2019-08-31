const mysql		= require('mysql')
const config	= require('./../databaseConfig.js')

const connection = mysql.createConnection(config)

connection.connect((callback)=>{
	if (callback) {
		return console.log(callback)
	}
	console.log("Conexão com mysql realizada com sucesso!")
})