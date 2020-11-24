const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const adminUserModel = require('../../models/adminUserModel');
const supModel = require('../../models/supModel');
const { runInNewContext } = require('vm');
const adminModel = require('../../models/adminModel');
const subscriberModel = require('../../models/subscriberModel');
// const adminUserModel = require.main.require('././models/supModel');
const router = express.Router();
const app 			= express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });

// router.get('/create', (req, res) => {
// 	res.render('admin/create');
// })


// // })

// router.post('/create', (req, res)=> {
// 	var user = {
// 		username: req.body.username,
// 		name: req.body.name,
// 		type:req.body.type,
// 		mobile:req.body.mobile,
// 		email:req.body.email,
// 		gender:req.body.gender,
//         address:req.body.address,
//         password:req.body.password


// 	};

// 	adminModel.insert(user, function (status) {
// 		if (status) {
//             adminUserModel.insert(user, function (status) {
//                 if (status) {
//                     res.redirect('/supAdmin_home/admin');
//                 } else {
//                     res.render('admin/create');
//                 }
//             });
// 		} else {
// 			res.render('admin/create');
// 		}
//     });
   
// })

// router.get('/edit/:id', (req, res) => {


// 	adminModel.getById(req.params.id, function (result) {

// 		var user = {
//             name:result.Name,
//             mobile:result.Mobile,
//             email:result.Email,
//             gender:result.Gender,
//             address:result.Address
// 		};

// 		res.render('admin/edit', user);
// 	});
// })


// router.post('/edit/:id', (req, res) => {

// 	var user = {
// 		id: req.params.id,
       
// 		name: req.body.name,
	
// 		mobile:req.body.mobile,
// 		email:req.body.email,
// 		gender:req.body.gender,
//         address:req.body.address
       
// 	};
// 	adminModel.update(user, function (status) {

// 		if (status) {
// 			res.redirect('/supAdmin_home/admin');
// 		} else {
// 			res.render('admin/edit', user);
// 		}
// 	});

// 	// res.redirect('/home/userlist');
// })

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
			res.redirect('/supAdmin_home/admin');
		}
	});

})
router.post('/uname', (req, res) => {
	var user = {
		search: req.body.search
	};

	subscriberModel.search(user, function (results) {
		if (results) {

			res.json({ flag: false });
		} else {
			res.json({ flag: true });
		}
	});
});

module.exports = router;


