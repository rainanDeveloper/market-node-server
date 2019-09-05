const fs 			= require('fs')
const mysql			= require('mysql')
const config		= require('./databaseConfig.js')
const connection	= mysql.createConnection(config)

function createDB(connection, sql) {
	connection.query(sql, (error, results, fields)=>{
		if (fields) {
			console.log(fields)
		}

		if (results) {
			console.log(results)
		}

		if (error) {
			console.log(error)
		}
	})
}

let dir = './database/migrations/'

connection.connect((callback)=>{
	if (callback) {
		return console.log("Conexão não pode ser estabelecida. Detalhes do erro: "+callback)
	}
	console.log("Conexão com mysql realizada com sucesso!")

	let migrationsFiles = fs.readdirSync(dir)
	let dbSql = ''
	
	migrationsFiles.forEach((element, index)=>{
		if (element!='index.js' & !element.match(/^\./g)) {
			migration = require(dir+(element.replace(/\.js$/g, '')))
			
			dbSql = migration.sqlData

			createDB(connection, dbSql)
			console.log(dbSql)
		}
	})
})


