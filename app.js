//get request means user is requesting something to get then we send him the required data.
//post request means user send something to us by using them we can send him the required result that he want.
//for using post request we have to install npm i body-parser
//in each app.get or app.post we can only use single res.send, but we can use multiple res.write to send multiple line response.  


const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));  //this line always added to use the body_parser to get the post request.

app.get("/", function(req, res){
   res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
const query= req.body.cityName;
const apikey= "f02811dded35321b297b84cc35291ac1";
const unit= "metric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;
https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
        const weatherData = JSON.parse(data);   //whole data stored in weatherData as object
        // console.log(weatherData);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;
        const icon= weatherData.weather[0].icon;
        const imgURL= "http://openweathermap.org/img/wn/" + icon + "@2x.png";
        console.log(temp);
        console.log(description);
        // res.send("<h1>the temperature in london "+ temp + " degrees celcius</h1>");
        //In order to send multiple line we have to use send.write and make res.send as blank.
        res.write("<p>the weather is currently " + description + "</p>");
        res.write("<h1>The temperature in " + query + " is "+ temp + " degrees Celcius.</h1>");
        res.write("<img src=" + imgURL + ">");
        res.send();
    })
})
    
})




// res.send("Server is up and running.");    //There can only be one res.send in an single app.get

app.listen(5000, function(){
    console.log("Server is runnig on port 5000.");
})