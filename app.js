const express = require("express");
const https =  require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
  });

app.post("/",function(req,res){
  const cityName = req.body.city;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=96ae04e588f74886882f78df44cea697";
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const a = JSON.parse(data);
      const temp = a.main.temp
      const description =a.weather[0].description
      const icon = a.weather[0].icon
      const imgurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The Tempature in "+cityName+" is "+ temp +"degrees c.</h1>");
      res.write("<img src="+imgurl+">");
      res.send();

    });
  });
});


app.listen(3000,function(){
  console.log("server started");
});
