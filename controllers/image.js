const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '65cef96ad9ee48c1ae6d2103aaa3a91a'
});


 const handleImageUrl = (req, res) => {
 	app.models
 	.predict(Clarifai.FACE_DETECT_MODEL, req.body.userInput)
	.then(response=> res.json(response))
	.catch(err => res.status(400).json("unable to fetch data"))
 }

const handleImage = (req,res,db)=>{
	const {id} = req.body;
	db('users')
		.where({id})
		.increment('entries',1)
		.returning('entries')
		.then(entries=>{
			res.json(entries[0])
		})
	.catch(err => {
		res.json("user not found")
	})
}
module.exports = {
	handleImage: handleImage,
	handleImageUrl:handleImageUrl
};