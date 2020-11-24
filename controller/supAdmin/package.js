const express = require('express');
const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const supModel = require('../../models/supModel');
var feature = require('../../assets/json/packagefeature.json');
const { runInNewContext } = require('vm');
// const adminUserModel = require.main.require('./models/supModel/supModel');
const router = express.Router();
const app = express();
const urlencodedparser = bodyParser.urlencoded({ extended: false });
const fs = require('fs');

router.get('/edit', (req, res) => {
	res.render('package/edit', { featurelist: feature });
})



router.post('/edit', (req, res) => {
	//var data = fs.readFileSync('./assets/json/packagefeature.json','utf8');
	console.log("edit");
	function jsonReader(filepath,cb){
		fs.readFile(filepath,'utf-8',(err,filedata) => {
			if(err){
				return cb && cb(err);
			}
			try{
				const object = JSON.parse(filedata);
				console.log("asfaasd");
				return cb && cb(null,object);
			}catch(err){
				return cb && cb(err);
			}
		});
	}
	jsonReader('./assets/json/packagefeature.json', (err, data) => {
		if (err) {
			console.log(err);
		}
		else {

			data.s1 = req.body.s1;
			data.s2 = req.body.s2;
			data.s3 = req.body.s3;
			data.s4 = req.body.s4;
			data.s5 = req.body.s5;
			data.s6 = req.body.s6;
			data.a1 = req.body.a1;
			data.a2 = req.body.a2;
			data.a3 = req.body.a3;
			data.a4 = req.body.a4;
			data.a5 = req.body.a5;
			data.a6 = req.body.a6;
			data.e1 = req.body.e1;
			data.e2 = req.body.e2;
			data.e3 = req.body.e3;
			data.e4 = req.body.e4;
			data.e5 = req.body.e5;
			data.e6 = req.body.e6;
			fs.writeFile('./assets/json/packagefeature.json', JSON.stringify(data,null,2), err => {
				if (err) {
					console.log(err);
				}
				else {
					console.log("Json updated successfully")
				}
			});

		}
	});
	// var package = {
	// 	s1:req.body.s1,
	// 	s2:req.body.s2 ,
	// 	s3:req.body.s3 ,
	// 	s4:req.body.s4 ,
	// 	s5:req.body.s5 ,
	// 	s6:req.body.s6 ,
	// 	a1:req.body.a1 ,
	// 	a2:req.body.a2 ,
	// 	a3:req.body.a3,
	// 	a4:req.body.a4 ,
	// 	a5:req.body.a5 ,
	// 	a6:req.body.a6 ,
	// 	e1:req.body.e1 ,
	// 	e2:req.body.e2 ,
	// 	e3:req.body.e3 ,
	// 	e4:req.body.e4 ,
	// 	e5:req.body.e5 ,
	// 	e6:req.body.e6 

	// };

	// var packagelist = JSON.parse(data);
	// var newlist = [];

	// packagelist.forEach(function(package){
	// 	newlist.push([])



res.redirect('/supAdmin_home/package')




});

// supModel.insert(supAdmin, function (status) {
// 	if (status) {
// 		res.redirect('/home/supAdmin');
// 	} else {
// 		res.render('supAdmin/create');
// 	}
// });



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
