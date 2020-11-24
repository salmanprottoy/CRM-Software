const express = require('express');
const bodyParser = require('body-parser');
var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('././views/supAdmin_home/invoice.ejs', 'utf8');
var options = { format: 'A4' };


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
			cmname: result.Manager_Name
		};

		res.render('verification/verify', user);
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
				cmname: req.body.cmname


			};


			subscriberModel.insert(user, function (status) {
				if (status) {
					pdf.create(html, options).toFile('assets/uploads/invoice.pdf', function (err, res) {
						if (err) { return console.log(err); }
						else {
							console.log(res); // { filename: '/app/businesscard.pdf' } 
							// var datafile = fs.readFileSync('assets/uploads/invoice.pdf');
							// res.header('content-type', 'application/pdf');
							// res.send(datafile);
						}
					});
					res.redirect('/supAdmin_home/verification');
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


