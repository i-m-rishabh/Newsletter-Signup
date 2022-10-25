const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/', function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post('/', function(req, res){
    var fn = req.body.firstName;
    var ln = req.body.lastName;
    var mail = req.body.email;
    console.log(fn, ln, mail);
    res.send("thanks for signing up");
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})

