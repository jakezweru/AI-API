const handleRegister= (req,res,db,bcrypt) => {
	const {name,password,email} = req.body;
	if(!name || !password || !email){
		return res.status(400).json("incorrect form submition");
	} 
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const hash = bcrypt.hashSync(password, salt);
	db.transaction(trx=>{
		db('login')
		.transacting(trx)
		.insert({
			hash:hash,
			email:email
		})
		.returning('email')
		.then(loginemail=> {
			return db('users')
		.transacting(trx)
		.returning('*')
		.insert({
			name:name,
			email:loginemail[0],
			joined: new Date()
			})
		.then(user =>{
				res.json(user[0])
			})
		})
		
		.then(trx.commit)
    .catch(trx.rollback);
		})
	.catch(err=>{
		res.status(400).json("unable to register")
	})
	 
}

module.exports = {
	handleRegister: handleRegister
};