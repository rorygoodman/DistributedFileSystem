const express = require('express');
const request = require('request');
const fs = require ('fs');
const path = require('path')
var app = express();
app.listen(3001);
app.get('',function(req,res){
	res.sendFile(path.join(__dirname + '/uploadForm.html'));
});
request.post('locahost:3001',"uploadForm.html",function(req,res){
	
});


