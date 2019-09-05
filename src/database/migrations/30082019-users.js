module.exports = {
	description	: "Creation of basic user's table",
	sqlData 	: 'CREATE TABLE IF NOT EXISTS usuario ('+
	'   usr_id INT NOT NULL,'+
	'   usr_login VARCHAR(45) NOT NULL,'+
	'   usr_senha VARCHAR(64) NOT NULL,'+
	'   usr_nome VARCHAR(100) NOT NULL,'+
	'   usr_cpf VARCHAR(14) NOT NULL,'+
	'   usr_telefone VARCHAR(14) NULL,'+
	'   usr_email VARCHAR(45) NULL,'+
	'   usr_grupo_acesso VARCHAR(45) NOT NULL,'+
	'   PRIMARY KEY (usr_id));'
}