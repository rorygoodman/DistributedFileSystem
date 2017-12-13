	
const sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database("./db.sqlite3", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
    if (err) console.log(err.message);
    else console.log("DB Created")
});
db.run("CREATE TABLE IF NOT EXISTS users (username STRING PRIMARY KEY,logged_in BOOLEAN DEFAULT false)");

addUser("Steve");
function addUser(username){
	db.get("SELECT * FROM users WHERE username = ? ",username,function(err, row) {
      if(row==undefined){
      	db.run("INSERT INTO users(username,logged_in) VALUES ('"+username+"','true')");
      	console.log("steve added");
      }
      else{
      	console.log("username taken");
      }

  });
}





