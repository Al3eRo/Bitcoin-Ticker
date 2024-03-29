//jshint esversion:6

const express           = require("express");
const bodyParser        = require("body-parser");
const request           = require("request");
const app               = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});





app.post("/", function(req, res){

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var amount = req.body.amount;

  console.log(amount);


  var options = {
    url: "https://apiv2.bitcoinaverage.com/convert/global",
    mathod: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body){
    var data = JSON.parse(body);
    var price = data.price;
    res.write("<p>" + data.time + "</p>");
    res.write("<h1>" + amount + crypto +  " is "  + price + " " + fiat + "</h1>");
    res.send();
  });

  console.log(amount);



});

app.listen(3000, function(){
  console.log("Server is running at port 3000");
});
