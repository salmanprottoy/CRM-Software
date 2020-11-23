const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{

	//req.session.uname = null;
	res.clearCookie('uname');
	if(clearCookie()){
		res.redirect('/login');
	}
	//res.redirect('/login');
})

module.exports = router;