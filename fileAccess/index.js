	
const sqlite3 = require('sqlite3').verbose();
const fileUpload = require('express-fileupload');
const express = require('express');
const mv = require('mv');
const bp = require('body-parser');
const multiparty =  require('multiparty')
const formidable = require('express-formidable');
const fs = require('fs');
var app = express();


app.use(bp.json());
app.use(bp.urlencoded({ extended: false }));
app.use(formidable());
//app.use(fileUpload());
app.listen(3000);
const request=require('request');
var fileCount=0;

var db = new sqlite3.Database("./db.sqlite3", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
    if (err) console.log(err.message);
    else console.log("DB Created")
});
db.run("CREATE TABLE IF NOT EXISTS users (username STRING PRIMARY KEY,logged_in BOOLEAN DEFAULT false)");
db.run("CREATE TABLE IF NOT EXISTS files (id INTEGER PRIMARY KEY, uploader STRING, path STRING, lastChanged TEXT, FOREIGN KEY (uploader) REFERENCES users(username))");
addUser("Steve");
function addUser(username){
	db.get("SELECT * FROM users WHERE username = ? ",username,function(err, row) {
      if(row==undefined){
      	db.run("INSERT INTO users(username,logged_in) VALUES ('"+username+"','true')");
      	console.log("steve added");
      }
      else{
      	console.log("username "+row.username+" taken");
      }

  });
}
app.post('/upload',function (req, res) { 
  // contains non-file fields 
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
   // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   let file = req.files.file;
   console.log(req.fields.username);
    
    // Use the mv() method to place the file somewhere on your server
    var oldpath = file.path;
    var newpath = 'files/' + file.name;
    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      db.run("INSERT INTO files(id,uploader,path,lastChanged) VALUES ("+fileCount+","+req.fields.username+",files/"+file.name+",date('now'))");
      fileCount++;
      res.write('File uploaded and moved!');
      res.end();
    });
    
	/**/


});   
