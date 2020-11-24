const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const supModel = require('../models/supModel');
const { runInNewContext } = require('vm');
// const adminUserModel = require.main.require('./models/supModel/supModel');
const router = express.Router();
const app 			= express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/create', (req, res) => {
	res.render('supAdmin/create');
})

// router.post('/create',urlencodedparser , [
// 	check('username' , 'Username is empty')
// 	.exists(),
// 	check('email','Email is not valid')
// 	.isEmail()
// 	.normalizeEmail()
// ],(req, res)=>{

// 	const error = validationResult(res)
// 	if(!error.isEmpty()){
// 		console.log('error ase');
// 		const alert = error.array()
// 		res.render('supAdmin/create' , {
// 			alert
// 		})
// 	}

// 	// var user = {
// 	// 	username: 	req.body.username,


// 	// };

// 	// supModel.insert(user, function(status){
// 	// 	if(status){
// 	// 		res.redirect('/home/userlist');
// 	// 	}else{
// 	// 		res.redirect('user/create');
// 	// 	}
// 	// });
// })

router.post('/create', (req, res)=> {
	var supAdmin = {
		username: req.body.username,
		name: req.body.name,
		type:req.body.type,
		mobile:req.body.mobile,
		email:req.body.email,
		gender:req.body.gender,
		address:req.body.address


	};

	supModel.insert(supAdmin, function (status) {
		if (status) {
			res.redirect('/home/supAdmin');
		} else {
			res.render('supAdmin/create');
		}
	});
})

router.get('/edit/:id', (req, res) => {


	adminUserModel.getById(req.params.id, function (result) {

		var user = {
			username: result.username,
			password: result.password,
			type: result.type
		};

		res.render('user/edit', user);
	});
})


router.post('/edit/:id', (req, res) => {

	var user = {
		id: req.params.id,
		username: req.body.username,
		password: req.body.password,
		type: req.body.type
	};
	adminUserModel.update(user, function (status) {

		if (status) {
			res.redirect('/home/userlist');
		} else {
			res.render('user/edit', user);
		}
	});

	// res.redirect('/home/userlist');
})

router.get('/delete/:id', (req, res) => {
	adminUserModel.getById(req.params.id, function (result) {

		var user = {
			username: result.username,
			password: result.password,
			type: result.type
		};

		res.render('user/delete', user);
	});

})

router.post('/delete/:id', (req, res) => {

	adminUserModel.delete(req.params.id, function (status) {
		if (status) {
			res.redirect('/home/userlist');
		}
	});

})

router.post('/uname', (req, res) => {
	var user = {
		search: req.body.search
	};

	supModel.search(user, function (results) {
		if (results) {

			res.json({ flag: true });
		} else {
			res.json({ flag: false });
		}
	});
});

module.exports = router;


//validation -> express-validator (https://www.npmjs.com/package/express-validator)
//file upload -> express-fileupload (https://www.npmjs.com/package/express-fileupload)
