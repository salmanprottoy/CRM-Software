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
		var sql = "select * from verifysubscriber where id='"+id+"'";
		db.getResults(sql, function(results){
			if(results.length >0 ){
				callback(results[0]);
			}
		});
	},
	getAll: function(callback){
		var sql = "select * from verifysubscriber";
		db.getResults(sql, function(results){
			callback(results);
		});

	},
	insert: function(user, callback){
		var sql = "insert into verifiysubscriber VALUES ('', '"+user.type+"' , '"+user.cname+"' , '"+user.cemail+"' , '"+user.cmobile+"', '"+user.cemployee+"' , '"+user.caddress+"', '"+user.cmname+"'  )";
		
		//console.log(sql);

		db.execute(sql, function(status){
			callback(status);
		});
	},
	update: function(user, callback){
		var sql = "update adminuser set username='"+user.username+"' , password='"+user.password+"' , type='"+user.type+"' where id = '"+user.id+"'";
		db.execute(sql,function(status){
			callback(status)
		});

	},
	delete: function(id, callback){
		var sql = "DELETE FROM adminuser WHERE id = '"+id+"'";
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