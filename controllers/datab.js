const connect =(knex)=>{
	return knex({
	  	client: 'pg',
	  	connection: {
		    host : '127.0.0.1',
		    user : 'postgres',
		    password : 'data',
		    database : 'face'
  		}
	});
}
module.exports ={
	connect:connect
}