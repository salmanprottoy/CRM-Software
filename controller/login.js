const express 	= require('express');
const { Result } = require('express-validator');
const { check, validationResult } = require('express-validator');
const userModel	= require.main.require('./models/userModel');
const adminUserModel	= require.main.require('./models/adminUserModel');

const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/index')
})

router.post('/', (req, res)=>{

	var user = {
		username: req.body.username,
		password: req.body.password
	};
	userModel.validate(user, function(status,results){
		if(status){
			console.log(results);
			//req.session.uname = req.body.username;
			/* res.cookie('uname', req.body.username);
			res.redirect('/home'); */	
			res.cookie('uname', req.body.username);
			var user = {
				username: results[0].username,
				id: results[0].id,
				type : results[0].type,
				email: results[0].email,
				phone: results[0].contactNumber,
				pass: results[0].password,
			};
			console.log(user);
			req.session.use =user;
			req.session.designation = results[0].designation;
			req.session.mail = results[0].email;
			req.session.phone = results[0].contactNumber;
			req.session.username=results[0].username;
			req.session.idd = results[0].id;
			req.session.pass = results[0].password;
			if(user.type == "Manager"){
				res.redirect('/manager_home');
			}
			else if(user.type == "accountingSells"){
				res.redirect('/accountingSellsHome');
				console.log(user.username);
			}
			else if(user.type == "employee"){
				res.redirect('/markethome');
				console.log(user.username);
			}
			else{
				res.redirect('/login');
			}


		}else{
			res.redirect('/login');
		}
	});

})

router.get('/adminlogin', (req, res)=>{
	var message = null;
	//console.log(message);
	res.render('login/adminlogin',{message : message});
})

router.post('/adminlogin', (req, res)=>{
	
	var user = {
		username: req.body.username,
		password: req.body.password
	};

	adminUserModel.validate(user, function(result){
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
			console.log(user);
			if(user.type == "Super Admin"){
				res.redirect('/supAdmin_home');
			}
			else if(user.type == "Admin"){
				res.redirect('/admin_home');
			}
			else{
				var  message = "Wrong Username or password";
				//console.log(message);
				res.render('login/adminlogin',{message : message});
				
			}

		}else{
			var  message = "Wrong Username or password";
				//console.log(message);
			res.render('login/adminlogin',{message : message});
		}
	});

})

router.get('/register', (req, res) => {
	res.render('login/register')
})

router.post('/register', [
	check('cmname', 'Name must be at least 4 character').exists().isLength({min:4}),
	check('username', 'Username name must be at least 3 character').exists().isLength({min:3}).isAlpha(),
	check('password', 'mobile must be at least 4 character').exists().isLength({min:4})
],(req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();
		
		res.render('login/register',{alerts})
	} else {
	var user = {
		username: req.body.username,
		password: req.body.password,
		type:req.body.type
	};

	userModel.insert(user, function (status) {
		if (status) {
			//console.log("usermodel");
			adminUserModel.insert(user,function(status){
				if(status){
					//console.log("adminusermodel");
					res.redirect('/login');
				}else{
					res.redirect('/login/register');
				}
			})
			
		} else {
			res.redirect('/login/register');
		}
	});
}
})


module.exports = router;