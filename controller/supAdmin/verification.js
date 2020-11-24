const express = require('express');
const bodyParser = require('body-parser');

var pdf = require('html-pdf');
const nodemailer = require("nodemailer");
const fs 			= require("fs")
let alert = require('alert');



const { check, validationResult } = require('express-validator');
const adminUserModel = require('../../models/adminUserModel');
const subscriberModel = require('../../models/subscriberModel');
const { runInNewContext } = require('vm');
const verificationModel = require('../../models/verificationModel');
// const adminUserModel = require.main.require('././models/supModel');
const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });


router.get('/edit/:id', (req, res) => {


	adminModel.getById(req.params.id, function (result) {

		var user = {
			name: result.Name,
			mobile: result.Mobile,
			email: result.Email,
			gender: result.Gender,
			address: result.Address
		};

		res.render('admin/edit', user);
	});
})


router.post('/edit/:id', (req, res) => {

	var user = {
		id: req.params.id,

		name: req.body.name,

		mobile: req.body.mobile,
		email: req.body.email,
		gender: req.body.gender,
		address: req.body.address

	};
	adminModel.update(user, function (status) {

		if (status) {
			res.redirect('/supAdmin_home/admin');
		} else {
			res.render('admin/edit', user);
		}
	});

	// res.redirect('/home/userlist');
})

router.get('/verify/:id', (req, res) => {
	verificationModel.getById(req.params.id, function (result) {

		var user = {
			type: result.Subscription_Type,
			cname: result.Company_Name,
			cemail: result.Company_Email,
			cmobile: result.Contact_No,

			caddress: result.Company_Address,
			cmname: result.Manager_Name,
			
		};
		if(result.Subscription_Type == "Stand"){
			var amount = "100";
		}else if(result.Subscription_Type == "Advan"){
			var amount = "150";
		}else{
			var amount = "250";
		}

		res.render('verification/verify', {user:user,amount});
	});
	

})

router.post('/verify/:id', [
	check('type', 'Type must be at least 2 character').exists().isLength({min:2}),
	check('cname', 'company name name must be at least 3 character').exists().isLength({min:3}),
	check('cmobile', 'mobile must be at least 4 character').exists().isLength({min:4}),
	check('cmname', 'Manager Name must be at least 4 character').exists().isLength({min:4}),
	check('caddress', 'address must be at least 5 character').exists().isLength({min:5}),
	check('cemail', 'Email is not valid').isEmail().normalizeEmail()

], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();
		
		res.render('verification/verify',{alerts})
	} else {

	verificationModel.delete(req.params.id, function (status) {
		if (status) {
			

			var user = {
				type: req.body.type,
				cname: req.body.cname,
				cemail: req.body.cemail,
				cmobile: req.body.cmobile,

				caddress: req.body.caddress,
				cmname: req.body.cmname,
date:req.body.date,
fee:req.body.fee

			};


			subscriberModel.insert(user, async function (status) {
				if (status) {
					verificationModel.insertreport(user,async function(status){
						if( status){
							let transporter = nodemailer.createTransport({
								host: "smtp.ethereal.email",
								port: 587,
								secure: false, // true for 465, false for other ports
								auth: {
									user: 'leola.bins@ethereal.email', // ethereal user
									pass: 'D9nvuffNUCRta84fmH', // ethereal password
								},
							});
							
							let info = await transporter.sendMail({
								from: '"DESKAPP" <deskapp123@yahoo.com>', // sender address
								to: user.cemail, // list of receivers
								subject: "Payment Done", // Subject line
								text: "Your 1 month '"+user.type+"'subscription of DESKAPP activated successfully. ",
								html: "<a href='http://localhost:3000/login/register'>Click Here</a> to register"
							  });
							console.log("Message sent: %s", info.messageId);
		
							console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
							//alert("Email sent successfully");
							res.redirect('/supAdmin_home/verification');
						}
					});
					
				} else {
					res.render('verification/verify');
				}
			});


		} else {
			res.render('verification/verify');
		}
	});
	
}


})

router.post('/uname', (req, res) => {
	var user = {
		search: req.body.search
	};

	verificationModel.search(user, function (results) {
		if (results) {

			res.json({ flag: true });
		} else {
			res.json({ flag: false });
		}
	});
});

module.exports = router;


