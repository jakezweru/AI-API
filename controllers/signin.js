const handleSignin = (req, res, db, bcrypt) => {
  const {email, password} =  req.body;
  if(!password || !email){
    return res.status(400).json("incorrect form submition")
  }
  db.select('*').from('login')
  .where('email', '=', req.body.email)
 	.then(data=>{
 		const isvalid = bcrypt.compareSync(req.body.password, data[0].hash);
 		if(isvalid){
 			return db.select('*').from('users')
 			.where('email','=', req.body.email)
 			.then(userl=>{
 				res.json(userl[0])
 			})
 			.catch(err =>{
 		     res.status(400).json('Invalid details')
      })
 		}
 	})
 	.catch(err =>{
 		res.status(400).json('Invalid details')
 })
}
module.exports = {
  handleSignin: handleSignin
};