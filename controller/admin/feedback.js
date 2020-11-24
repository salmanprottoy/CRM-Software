const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const supModel = require('../../models/supModel');
const { runInNewContext } = require('vm');
const adminUserModel = require('../../models/adminUserModel');
const feedbackModel = require('../../models/feedbackModel');
// const adminUserModel = require.main.require('././models/supModel');
const router = express.Router();
const app 			= express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });



router.get('/solved/:id', (req, res) => {


	feedbackModel.getById(req.params.id, function (result) {

		var user = {
            username:result.username,
            comment:result.comment,
            date:result.date,
            isSolved:result.isSolved
		};

		res.render('feedback/solved', user);
	});
})


router.post('/solved/:id', (req, res) => {

	var user = {
        id: req.params.id,
        username:req.body.username,
        comment:req.body.comment,
        date:req.body.date,
		isSolved:req.body.isSolved
	};
	feedbackModel.update(user, function (status) {

		if (status) {
			res.redirect('/admin_home/feedbacks');
		} else {
			res.render('feedback/solved', user);
		}
	});

	// res.redirect('/home/userlist');
})

router.get('/delete/:id', (req, res) => {
	feedbackModel.getById(req.params.id, function (result) {

		var user = {
            username:result.username,
            comment:result.comment,
            date:result.date,
            isSolved:result.isSolved
		};

		res.render('feedback/delete', user);
	});

})

router.post('/delete/:id', (req, res) => {

	feedbackModel.delete(req.params.id, function (status) {
		if (status) {
			res.redirect('/supAdmin_home/feedbacks');
			
		}else {
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
