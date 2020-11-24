const express 	= require('express');
const nodemailer = require("nodemailer");
const userModel = require.main.require('./models/userModel');
const clientsModel = require.main.require('./models/clientsModel');
const campaignsModel = require.main.require('./models/campaignsmodel');
const {check,validationResult}=require('express-validator');
const fastcsv 		= require("fast-csv");
const fs 			= require("fs");
const router 	= express.Router();

router.get('/',(req,res)=>{
	console.log('ee');
	if(req.cookies['uname'] != null){
	    campaignsModel.getAll(function(results){
	    	res.render('campaigns/camp',{userlist:results});
	    })
	}else{
		res.redirect('/login');
	}
})
router.post('/search',(req,res)=>{
	var campaign = {
		search : req.body.search,
		searchBy: req.body.searchBy
	};
	campaignsModel.search(campaign, function(results){
		if(results){
			console.log(results);
			res.json({userlist: results});
		}else{
			res.json({userlist:'error'});
		}
	});
});
router.get('/mail/:id',  (req,res)=>{
	var campaign = {
		search : req.params.id,
		searchBy: 'eventid'
	};
	campaignsModel.search(campaign, function(results){
		if(results){
			var temp= results[0].audience;
			var tab='leads';
			var body=results[0].eventdescription;
			if(temp=='customer') tab='customer';
			clientsModel.getAll(tab, async function(results){
				var str="";
				if(results.length>0)
				{
						for(var i=0;i<results.length;i++)
						{
							if(tab=='leads') str+=results[i].email;
							else str+=results[i].customerEmail;
							if(i+1<results.length) str+=", ";
						}
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
					    from: '"Fred Foo 👻" <foo@example.com>', // sender address
					    to: str, // list of receivers
					    subject: "Hello ✔", // Subject line
					    text: body
					  });
				    console.log("Message sent: %s", info.messageId);

				    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
				}
			    
			    res.redirect('/markethome');
					})
			// res.json({userlist: results});
		}else{
			res.json({userlist:'error'});
		}
	});
})
module.exports = router;