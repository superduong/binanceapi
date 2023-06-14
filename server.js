var express = require("express");

// read file
var fs = require("fs");
var app = express();

app.set("view engine", "ejs");
app.set("views","./views");
app.use(express.static("public"));
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.io = io;

server.listen(3000);

loadConfigFile("./config.json");

function loadConfigFile(file){
    var obj;
    fs.readFile(file,"utf8", function(err, data){
        if(err) throw err;
        obj = JSON.parse(data);
        //console.log(obj.KEY);
        require("./routes/client")(app,obj);

        // binance api
        const Binance = require('node-binance-api');
        const binance = new Binance().options({
        APIKEY: obj.APIKEY,
        APISECRET: obj.APISECRET
});

/*
        binance.futuresPrices()
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log(err);
        });

        */

        binance.openOrders(false, (error, openOrders) => {
            console.info("openOrders()", openOrders);
          });

    });
}

/*app.get("/",function(req, res){
    res.send("Hello");
});

*/