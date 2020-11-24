const db = require('./db');

module.exports ={

	validate: function(user, callback){
		var sql = "select * from user where username='"+user.username+"' and password='"+user.password+"'";
		db.getResults(sql, function(results){
			if(results.length > 0){
				callback(true,results);
			}else{
				callback(false,results);
			}
		});
	},
	getById: function(id,callback){
		var sql = "select * from eventinfo where id='"+id+"'";
		db.getResults(sql,function(results){
			callback(results);
		})
	},
	getAll: function(callback){
		var sql = "select * from eventinfo";
		db.getResults(sql, function(results){
			console.log(results);
			callback(results);
		});

	},
	search: function(campaign, callback){
        var sql = "SELECT * FROM eventinfo WHERE "+campaign.searchBy+" LIKE '%"+campaign.search+"%'";
        console.log('oo');
        db.getResults(sql, function(results){
            if(results.length > 0){
                callback(results);
            }else{
                callback(false);
            }
        });
    }
	
}