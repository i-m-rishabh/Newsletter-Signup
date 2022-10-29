const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
    res.sendFile(__dirname+"/signup.html");
});

app.post('/', function(req, res){
    const fn = req.body.firstName;
    const ln = req.body.lastName;
    const mail = req.body.email;
    // console.log(fn, ln, mail);
    // res.send("thanks for signing up");

    data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields:{
                    FNAME: fn,
                    LNAME: ln
                }
            }
        ]
    };

const jsonData = JSON.stringify(data);

const url = "https:us10.api.mailchimp.com/3.0/lists/b7367d0b36";
const options = {
    method: "POST",
    auth: "rishabh:07866c0ad2c407bc1f9e5e57ad2cb1b6-us10"
}

const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html")
    }else{
        res.sendFile(__dirname + "/failure.html")
    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
    })
});

    request.write(jsonData);
    request.end();
    
})

app.post('/failure', function(req, res){
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
})

// mailchimp api key
// 07866c0ad2c407bc1f9e5e57ad2cb1b6-us10

// audience id
//  b7367d0b36