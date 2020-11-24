const express 	= require('express');
var feature 	= require('../../assets/json/packagefeature.json');
const adminModel = require('../../models/adminModel');
const supModel = require('../../models/supModel');
const verifyModel = require('../../models/verifyModel');
const subscriberModel = require('../../models/subscriberModel');
const feedbackModel = require('../../models/feedbackModel');
const noticeModel = require('../../models/noticeModel');

// const adminUserModel = require.main.require('../../models/verifyModel');
const router 	= express.Router();


router.get('*',  (req, res, next)=>{
	if(req.cookies['uname'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/', (req, res)=>{
	
	// if(req.cookies['uname'] != null){
	// 	res.render('supAdmin_home/index');
	// }else{
	// 	res.redirect('/login');
	// }
	console.log(req.cookies['uname']);
	var uname = req.cookies['uname'];
	console.log(uname);
	res.render('supAdmin_home/index',{uname});
})


router.get('/subscriber', (req, res)=>{
	
	subscriberModel.getAll(function(results){
		var uname = req.cookies['uname'];
		res.render('supAdmin_home/subscriber',{ userlist:results , uname}); 
	});
})

router.get('/supAdmin', (req, res)=>{
	// res.render('supAdmin_home/supAdmin'); 
	supModel.getAll(function(results){
		var uname = req.cookies['uname'];
		res.render('supAdmin_home/supAdmin', {userlist: results, uname});
	});
})
router.get('/admin', (req, res)=>{
	
	adminModel.getAll(function(results){
		var uname = req.cookies['uname'];
		res.render('supAdmin_home/admin', {userlist: results, uname});
	}); 
})

router.get('/feedbacks', (req, res)=>{
	
	feedbackModel.getAll(function(results){
		var uname = req.cookies['uname'];
		res.render('supAdmin_home/feedbacks', {userlist: results, uname});
	});
})
router.get('/verification', (req, res)=>{
	verifyModel.getAll(function(results){
		var uname = req.cookies['uname'];
		res.render('supAdmin_home/verification', {userlist: results, uname});
	});
})
router.get('/package', (req, res)=>{
	var uname = req.cookies['uname'];
	res.render('supAdmin_home/package',
	{featurelist : feature , uname}
	); 
})
router.get('/meeting', (req, res)=>{

	noticeModel.getMeeting(function(results){
		var uname = req.cookies['uname'];
		res.render('supAdmin_home/meeting', { userlist: results, uname});
	});
})
router.get('/template', (req, res)=>{
	var uname = req.cookies['uname'];
	res.render('supAdmin_home/template'); 
})
router.get('/financial', (req, res)=>{
	var uname = req.cookies['uname'];
	res.render('supAdmin_home/financialstatus'); 
})

module.exports = router;