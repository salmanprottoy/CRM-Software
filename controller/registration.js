const express 	= require('express');
const { check, validationResult } = require('express-validator');
var feature 	= require('../assets/json/packagefeature.json');
const regModel = require('../models/regModel');
// const adminUserModel	= require.main.require('./models/supModelregModel');
const router 	= express.Router();

router.get('/', (req, res)=>{
	res.render('login/getstarted',
	{featurelist : feature})
})

router.post('/', [
	check('type', 'type must be at least 4 character').exists().isLength({min:4}),
	check('cname', 'company name name must be at least 3 character').isLength({min:3}),
	check('cmobile', 'mobile must be at least 4 character').exists().isLength({min:4}).isNumeric(),
	check('cemployee', 'Employee Number must be at least  character').exists().isLength({min:1}).isNumeric(),
	check('caddress', 'address must be at least 5 character').exists().isLength({min:5}),
	check('cmname', 'Manager NAme must be at least 4 character').exists().isLength({min:4}),
	check('cemail', 'Company Email is not valid').isEmail().normalizeEmail()

],(req, res)=>{
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();
		
		res.render('login/getstarted',{alerts, featurelist : feature});
	} else {

	var user = {
		type:req.body.type,
		cname : req.body.cname,
		cemail:req.body.cemail,
		cmobile:req.body.cmobile,
		cemployee:req.body.cemployee,
		caddress:req.body.caddress,
		cmname:req.body.cmname
	};

	regModel.insert(user, function (status) {
		
		if (status) {
			
			res.redirect('/login/register');
		} else {
			
			res.render('login/getstarted');
		}
	});
	}
})

// router.get('/getstarted', (req, res)=>{
// 	res.render('login/getstarted')
// })

module.exports = router;