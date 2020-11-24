const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const supModel = require('../../models/supModel');
const { runInNewContext } = require('vm');
const adminUserModel = require('../../models/adminUserModel');
// const adminUserModel = require.main.require('././models/supModel');
const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/create', (req, res) => {
	var message = null;
	res.render('supAdmin/create',{message});
})



router.post('/create', [
	check('name', 'Name must be at least 4 character').exists().isLength({ min: 4 }),
	check('username', 'Username name must be at least 3 character').exists().isLength({ min: 3 }),
	check('mobile', 'mobile must be at least 4 character').exists().isLength({ min: 4 }),
	check('gender', 'gender must be at least 4 character').exists().isLength({ min: 4 }),
	check('address', 'address must be at least 5 character').exists().isLength({ min: 5 }),
	check('email', 'Email is not valid').isEmail().normalizeEmail()

], (req, res) => {
	var message = null;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();

		res.render('supAdmin/create', { alerts , message});
	} else {
		 
		//console.log("supadmin e dhuksi");
		var supAdmin = {
			username: req.body.username,
			name: req.body.name,
			type: req.body.type,
			mobile: req.body.mobile,
			email: req.body.email,
			gender: req.body.gender,
			address: req.body.address,
			password: req.body.password,
			file: req.files.image
			

		};
		var file = req.files.image;
		var image= file.name;

		console.log(file.mimetype);
		if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png') {
			file.mv('./assets/uploads/' + file.name, function (err) {
				if (err == null) {
				console.log("Image uploaded");
				supModel.insert(supAdmin,image, function (status) {
					if (status) {
						adminUserModel.insert(supAdmin, function (status) {
							if (status) {
								res.redirect('/supAdmin_home/supAdmin');
							} else {
								res.render('supAdmin/create',{message});
							}
						});
					} else {
						res.render('supAdmin/create',{message});
					}
				});
				} else {
					console.log("Image not uploaded");
				}
			});
		
		}else{
			var message = "Invalid  Image extension";
			res.render('supAdmin/create', { message  });
		}

		
	}

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

			adminUserModel.delete(req.params.id, function (status) {
				if (status) {
					res.redirect('/home/userlist');
				} else {
					res.render('supAdmin/delete');
				}
			});
		} else {
			res.render('supAdmin/delete');

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
