const hound	= require('hound')
const fs	= require('fs')

dir = './../models'
migrationDir = './migrations/'

watcher = hound.watch(dir)

watcher.on('create', (file, stats)=>{
	let newTable = ((file).replace(dir+'/', '')).replace(/\.json/g, '')


	let sql = `CREATE TABLE IF NOT EXISTS ${newTable} (${newTable}_id INT NOT NULL AUTO_INCREMENT, PRIMARY KEY (${newTable}_id))`

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
})

watcher.on('change', (file, stats)=>{
	let changedTable = ((file).replace(dir+'/', '')).replace(/\.json/g, '')

	let sql = `` // Implementar modificação na mudança

	let migrationObj = {
		description: `Modification of ${changedTable}'s table`,
		sqlData: sql
	}

	migrationData = "module.exports = " + JSON.stringify(migrationObj)

	let migrationFile = Date.now()+ '-' + changedTable+'-change.js'

	fs.writeFile(migrationDir+migrationFile, migrationData, (callback)=>{
		if (callback) {
			throw callback
		}

		console.log('Arquivo criado com sucesso: '+migrationFile)
	})
})

watcher.on('delete', (file, stats)=>{
	let deletedTable = ((file).replace(dir+'/', '')).replace(/\.json/g, '')

	let sql = `DROP TABLE ${deletedTable}`

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
})
