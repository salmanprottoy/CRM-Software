const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const adminUserModel = require('../../models/adminUserModel');
const supModel = require('../../models/supModel');
const { runInNewContext } = require('vm');
const adminModel = require('../../models/adminModel');
// const adminUserModel = require.main.require('././models/supModel');
const router = express.Router();
const app 			= express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

router.get('/create', (req, res) => {
	res.render('admin/create');
})


// })

router.post('/create', [
	check('name', 'Name must be at least 4 character').exists().isLength({min:4}),
	//check('username', 'Username name must be at least 3 character').exists().isLength({min:3}),
	check('mobile', 'mobile must be at least 4 character').exists().isLength({min:4}),
	check('gender', 'gender must be at least 4 character').exists().isLength({min:4}),
	check('address', 'address must be at least 5 character').exists().isLength({min:5}),
	check('email', 'Email is not valid').isEmail().normalizeEmail()

], (req, res)=> {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();
		
		res.render('admin/create',{alerts})
	} else {
	var user = {
		username: req.body.username,
		name: req.body.name,
		type:req.body.type,
		mobile:req.body.mobile,
		email:req.body.email,
		gender:req.body.gender,
        address:req.body.address,
        password:req.body.password


	};

	adminModel.insert(user, function (status) {
		if (status) {
            adminUserModel.insert(user, function (status) {
                if (status) {
                    res.redirect('/admin_home/admin');
                } else {
                    res.render('admin/create');
                }
            });
		} else {
			res.render('admin/create');
		}
    });
}
})

router.get('/edit/:id', (req, res) => {


	adminModel.getById(req.params.id, function (result) {

		var user = {
            name:result.Name,
            mobile:result.Mobile,
            email:result.Email,
            gender:result.Gender,
            address:result.Address
		};

		res.render('admin/edit', user);
	});
})


router.post('/edit/:id', [
	check('name', 'Name must be at least 4 character').exists().isLength({min:4}),
	//check('username', 'Username name must be at least 3 character').exists().isLength({min:3}),
	check('mobile', 'mobile must be at least 4 character').exists().isLength({min:4}),
	check('gender', 'gender must be at least 4 character').exists().isLength({min:4}),
	check('address', 'address must be at least 5 character').exists().isLength({min:5}),
	check('email', 'Email is not valid').isEmail().normalizeEmail()

], (req, res)=> {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		const alerts = errors.array();
		
		res.render('admin/edit',{alerts})
	} else {

	var user = {
		id: req.params.id,
       
		name: req.body.name,
	
		mobile:req.body.mobile,
		email:req.body.email,
		gender:req.body.gender,
        address:req.body.address
       
	};
	adminModel.update(user, function (status) {

		if (status) {
			res.redirect('/supAdmin_home/admin');
		} else {
			res.render('admin/edit', user);
		}
	});

}// res.redirect('/home/userlist');
})

router.get('/delete/:id', (req, res) => {
	adminModel.getById(req.params.id, function (result) {

		var user = {
			name:result.Name,
            mobile:result.Mobile,
            email:result.Email,
            gender:result.Gender,
            address:result.Address
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
		}else {
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


