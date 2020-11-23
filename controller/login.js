const express 	= require('express');
const { Result } = require('express-validator');
const userModel	= require.main.require('./models/userModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index')
})

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(result){
		if(result){
			//req.session.uname = req.body.username;
			/* res.cookie('uname', req.body.username);
			res.redirect('/home'); */	
			res.cookie('uname', req.body.username);
			var user = {
				username: result.username,
				password: result.password,
				type: result.type
			};
			if(user.type == "superadmin"){
				res.redirect('/supAdmin_home');
			}
			else if(user.type == "admin"){
				res.redirect('/admin_home');
			}
			else if(user.type == "accountingSells"){
				res.redirect('/accountingSellsHome');
				console.log(user.username);
			}

		}else{
			res.redirect('/login');
		}
	});

})

/* router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};

	userModel.validate(user, function(status){
		if(status){
			req.session.uname = req.body.username;
			//	res.cookie('uname', req.body.username);
			res.redirect('/accountingSellsHome');	
		}else{
			res.redirect('/login');
		}
	});

}) */

module.exports = router;