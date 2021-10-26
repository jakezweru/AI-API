const handleProfile = (req,res, db)=>{
	const {userid} = req.params;
	db.select('*').from('users').where({id:userid})
	.then(user=>{
		if(user.length){
			return res.json(user[0])
		} else {
			return res.status(400).json("not found")
		}
	})
	.catch(err => {
		res.json("user not found")
	})
}
module.exports = {
	handleProfile:handleProfile
};