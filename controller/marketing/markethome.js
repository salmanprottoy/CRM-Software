const express 	= require('express');
const userModel = require.main.require('./models/userModel');
const clientsModel = require.main.require('./models/clientsModel');
const {check,validationResult}=require('express-validator');
const fastcsv 		= require("fast-csv");
const fs 			= require("fs");
const router 	= express.Router();

router.get('/', (req, res)=>{

	if(req.cookies['uname'] != null){
	    var user = {
		username: req.session.username,
		id: req.session.idd,
		email: req.session.mail,
		phone: req.session.phone,
		designation:req.session.designation
	};
		res.render('markethome/index' ,{userlist:user});
	}else{
		res.redirect('/login');
	}
})
router.get('/profile',(req,res)=>{
	if(req.cookies['uname'] != null){
		var user = {
		username: req.session.username,
		id: req.session.idd,
		designation : req.session.designation,
		email: req.session.mail,
		phone: req.session.phone,
		pass: req.session.pass
	};
		res.render('markethome/profile',{userlist:user});
	}else{
		res.redirect('/login');
	}
})
router.post('/profile',[
	check('username','Username must be atleast 4 characters long').exists().isLength({min:4}),
	check('email','email not valid').isEmail(),
	check('phone','phone must be atleast 9 characters long').isLength({min:9})
	],(req,res)=>{
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			const alerts= errors.array();
			var user = {
				username: req.body.username,
				id: req.session.idd,
				email: req.body.email,
				phone: req.body.phone,
				designation:req.body.designation
			};
			console.log(user);
			res.render('markethome/profile',{alerts , userlist:user}); 
		}
		else
		{
			var user = {
				username: req.body.username,
				id: req.session.idd,
				email: req.body.email,
				phone: req.body.phone,
				designation:req.body.designation
			};
			userModel.update(user,function(status){
				if(status)
				{
					console.log("here");
					res.cookie('uname', req.body.username);
					req.session.use=user;
					req.session.mail = user.email;
					req.session.phone = user.phone;
					req.session.username=user.username;
					req.session.idd = user.id;
					req.session.pass = user.pass;
					req.session.designation=user.designation;
					res.redirect('/markethome/profile');
				}
				else
				{
					console.log(user);
					res.render('markethome/profile',{userlist:user});
				}
			})
		}	
})
router.get('/:id', (req, res)=>{

	if(req.cookies['uname'] != null)
	{
		var data = req.params.id;
		if(data=='leads')
		{
			clientsModel.getAll('leads',function(results){
				console.log(results);
			res.render('markethome/leadslist', {userlist: results});
			});
		}
		else
		{
			clientsModel.getAll('customer',function(results){
			res.render('markethome/customerlist', {userlist: results});
		});
		}
	}
	else
	{
		res.redirect('/login');
	}

});
router.get('/csv/:id',(req,res)=>{
	var data = req.params.id;
	if(data=='leads')
	{
		clientsModel.getAll('leads',function(results){
		const jsonData = JSON.parse(JSON.stringify(results));
    	console.log("jsonData", jsonData);
    	var ws=fs.createWriteStream("controller/marketing/files/sample.csv");
    	fastcsv
      	.write(jsonData, { headers: true })
      	.on("finish", function() {
        	res.download(__dirname+'/files/sample.csv','sample.csv',function(err){
      		if(err)
      		{
      			console.log(err);
      		}
      		else
      		{
      			console.log("i");
      		}
      	})
      	})
      	.pipe(ws);

	});
	}
	else
	{
		clientsModel.getAll('customer',function(results){
		const jsonData = JSON.parse(JSON.stringify(results));
    	console.log("jsonData", jsonData);
    	var ws=fs.createWriteStream("controller/marketing/files/customer.csv");
    	fastcsv
      	.write(jsonData, { headers: true })
      	.on("finish", function() {
        	res.download(__dirname+'/files/customer.csv','customer.csv',function(err){
      		if(err)
      		{
      			console.log(err);
      		}
      		else
      		{
      			console.log("i");
      		}
      	})
      	})
      	.pipe(ws);

	});
	}
})
module.exports = router;