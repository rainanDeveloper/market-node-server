const hound	= require('hound')
const fs	= require('fs')
const mysql			= require('mysql')
const config		= require('./../databaseConfig.js')

function executeQuery(sql, result) {
	connection	= mysql.createConnection(config)
	connection.query(sql, (error, results)=>{
		if (results) {
			console.log(results)
			result = results
		}

		if (error) {
			console.log(error)
			result = error
		}

		connection.end();
	})
}

function compareDatabaseModel(table, sql, tableName){
	connection	= mysql.createConnection(config)
	connection.query(sql, (error, results)=>{
		if (results) {
			console.log(results)
			result = results
		}

		if (error) {
			console.log(error)
			result = error
		}

		result.forEach((resultItem, index)=>{
			if (resultItem.Field!=`${tableName}_id`) {
				// Desenvolver a partir daqui
				if (table.includes(resultItem.Field)){
					console.log(`possui ${resultItem.Field}`)
				}
			}
		})

		connection.end();
	})
}

dir = './../models'
migrationDir = './migrations/'

watcher = hound.watch(dir)

watcher.on('create', (file, stats)=>{
	let newTable = ((file).replace(dir+'/', '')).replace(/\.json/g, '')


	let sql = `CREATE TABLE IF NOT EXISTS ${newTable} (${newTable}_id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (${newTable}_id))`

	if (executeQuery(connection, sql)){

		let migrationObj = {
			description: `Creation of ${newTable}'s table`,
			sqlData: sql
		}

		migrationData = "module.exports = " + JSON.stringify(migrationObj)

		let migrationFile = Date.now()+ '-' + newTable+'-create.js'

		fs.writeFile(migrationDir+migrationFile, migrationData, (callback)=>{
			if (callback) {
				throw callback
			}

			console.log('Arquivo criado com sucesso: '+migrationFile)
		})
	}
})

watcher.on('change', (file, stats)=>{
	let changedTable = ((file).replace(dir+'/', '')).replace(/\.json/g, '')

	// capturando campos no arquivo json

	console.log("Changed")

	let modelObj	= require(file)

	let nameFields	= Object.keys(modelObj)

	let fieldsProps	= Object.values(modelObj)


	nameFields.forEach((field, index)=>{
		var result=""

		let sqlFields = `DESC ${changedTable};`

		compareDatabaseModel(nameFields, sqlFields, changedTable)
	})
})

watcher.on('delete', (file, stats)=>{
	let deletedTable = ((file).replace(dir+'/', '')).replace(/\.json/g, '')

	let sql = `DROP TABLE ${deletedTable}`

	if (executeQuery(connection, sql)){

		let migrationObj = {
			description: `Deletion of ${deletedTable}'s table`,
			sqlData: sql
		}

		migrationData = "module.exports = " + JSON.stringify(migrationObj)

		let migrationFile = Date.now()+ '-' + deletedTable+'-delete.js'

		fs.writeFile(migrationDir+migrationFile, migrationData, (callback)=>{
			if (callback) {
				throw callback
			}

			console.log('Arquivo criado com sucesso: '+migrationFile)
		})
	}
})
