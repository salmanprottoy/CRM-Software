const express = require('express');
const userModel	= require.main.require('./models/userModel');
const clientsModel	= require.main.require('./models/clientsModel');
const {check,validationResult}=require('express-validator');
const router = express.Router();

router.get('/create', (req, res)=>{
	if(req.cookies['uname'] != null)
	{
		res.render('marketuser/create'); 
	}
	else
	{
		res.redirect('/login');
	}
})

router.post('/create',[
	check('username','Username must be atleast 4 characters long').exists().isLength({min:4}),
	check('email','email not valid').isEmail(),
	check('phone','phone must be atleast 9 characters long').isLength({min:9})
	] ,(req, res)=>{
		const errors = validationResult(req);
		if(!errors.isEmpty()){
			const alerts= errors.array();
			res.render('marketuser/create',{alerts}); 
		}
		else
		{
			var tab= req.body.type;
			var user={
				name:req.body.username,
				email:req.body.email,
				phone:req.body.phone,
				gender:req.body.gender,
				status:req.body.status
			}
			clientsModel.insert(user,tab,function(status){
				if(status)
				{
					console.log(status);
					res.redirect('/markethome/'+tab);
				}
			});
		}	
})
router.get('/upgrade/:id/:table',(req,res)=>{
	var id=req.params.id;
	var tab=req.params.table;
	clientsModel.updatebyid(tab,id,function(status){
		if(status)
		{
			res.redirect('/markethome/'+tab);
		}
	});
})

router.get('/profile/:table/:id', (req, res)=>{

	var data = req.params.id;
	var tab=req.params.table;
	clientsModel.getById(tab,data,function(results){
		if(tab=='leads')
		{
			var user ={
				name : results[0].name,
				email: results[0].email,
				phone: results[0].phone,
				status:results[0].status,
				gender:results[0].gender,
				id:    results[0].id
			};
		}
		else
		{
			var user ={
				name : results[0].customerName,
				email: results[0].customerEmail,
				phone: results[0].customerContactNumber,
				status:results[0].customerStatus,
				gender:results[0].customerGender,
				id:    results[0].id
			};
		}
		res.render('marketuser/profile',{userlist:user});
	})
})


router.post('/profile/:table/:id', (req, res)=>{

	var tab=req.params.table;
	var data=req.params.id;
	var user ={
		id: req.params.id,
		name: req.body.username,
		email:req.body.email,
		gender:req.body.gender,
		phone:req.body.phone,
		status:req.body.status
	};
	console.log("ppppppp");
	console.log(user);
	clientsModel.update(user,tab,function(status){
		if(status)
		{
			console.log(status);
			res.redirect('/markethome/'+tab);
		}
		else
		{
			console.log("NO");
		}
	})
})

// router.get('/delete/:id/:tab', (req, res)=>{
// 	var data = req.params.id;
// 	var table= req.params.tab;
// 	userModel.getById(data,table,function(results){
// 		var user ={
// 		id: req.params.id,
// 		username: results[0].username,
// 		password: results[0].password,
// 		type: results[0].type
// 	};
// 		res.render('user/delete', user);
// 	})
// })

router.get('/delete/:id/:tab', (req, res)=>{
	var data = req.params.id;
	var table= req.params.tab;
	clientsModel.delete(data,table,function(status){
		if(status)
		{
			res.redirect('/markethome/'+table);
		}
	})
	
})

module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)
