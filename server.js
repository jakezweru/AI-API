const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex')
const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const datab = require('./controllers/datab');

const db = datab.connect(knex);
const app = express();
app.use(BodyParser.json());
app.use(cors());

app.get('/', (req, res)=>{
	res.json(database.user);
})

app.post('/signin',(req,res) =>{signin.handleSignin(req, res, db, bcrypt)} )
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)} )
app.get('/profile/:userid',(req,res) => {profile.handleImage(req,res,db)})
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageUrl', (req,res) => {image.handleImageUrl(req,res)})

app.listen(3000, ()=> {
	console.log('its working on port 3000')
});