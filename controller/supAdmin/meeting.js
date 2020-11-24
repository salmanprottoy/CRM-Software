const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const adminUserModel = require('../../models/adminUserModel');
const supModel = require('../../models/supModel');
const { runInNewContext } = require('vm');
const noticeModel = require('../../models/noticeModel');
// const adminUserModel = require.main.require('././models/supModel');
const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/create', (req, res) => {
	res.render('meeting/create');
})


// })

router.post('/create', [
	//check('title', 'Title must be at least 2 character').exists().isLength({min:2}),
	check('details', 'Details name must be at least 10 character').exists().isLength({ min: 10 }),


], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();

		res.render('meeting/create', { alerts })
	} else {
		var user = {
			title: req.body.title,
			concerned_to: req.body.concerned_to,
			date: req.body.date,
			details: req.body.details


		};

		noticeModel.insert(user, function (status) {
			if (status) {

				res.redirect('/supAdmin_home/meeting');


			} else {
				res.render('meeting/create');
			}
		});
	}
})

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

router.get('/delete/:id', (req, res) => {
	adminModel.getById(req.params.id, function (result) {

		var user = {
			name: result.Name,
			mobile: result.Mobile,
			email: result.Email,
			gender: result.Gender,
			address: result.Address
		};

		res.render('admin/delete', user);
	});

})

router.post('/delete/:id', (req, res) => {

	adminModel.delete(req.params.id, function (status) {
		if (status) {
			// res.redirect('/supAdmin_home/admin');
			adminUserModel.delete(req.params.id, function (status) {
				if (status) {
					res.redirect('/supAdmin_home/admin');
				} else {
					res.render('admin/delete');
				}
			});
		} else {
			res.render('admin/delete');
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


