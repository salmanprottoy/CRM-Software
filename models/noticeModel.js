const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from verifysubscriber where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById: function(id, callback){
		var sql = "select * from admin where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from adminnotice";
		db.getResults(sql, function(results){
			callback(results);
		});

    },
    getMeeting: function(callback){
		var sql = "select * from adminnotice where title='Meeting'";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(user, callback){
		var sql = "insert into adminnotice VALUES ('',  '"+user.title+"' , '"+user.details+"' , '"+user.concerned_to+"', '"+user.date+"' )";
		
		console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "update admin set Name='"+user.name+"' , Mobile='"+user.mobile+"' , Email='"+user.email+"',Gender='"+user.gender+"' ,Address='"+user.address+"'  where id = '"+user.id+"'";
		db.execute(sql,function(status){
			callback(status)
		});

	},
	delete: function(id, callback){
		var sql = "DELETE FROM admin WHERE id = '"+id+"'";
		console.log(sql);
		db.execute(sql,function(status){
			callback(status);
		});
    },
    search: function(user, callback){
        var sql = "SELECT username FROM adminuser WHERE username = '"+user.search+"'";

		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(results[0]);
			}else{
				callback(false);
			}
		});
	}
}