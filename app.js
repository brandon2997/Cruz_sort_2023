var express = require("express")
var app = express()
var path = require("path")
var bodyparser = require("body-parser")
var mongoose =  require("mongoose")
const { response } = require("express")
var port = process.env.port||3000
var db = require("./config/database")
var sort = { game : 1}


app.use(bodyparser.json())

app.use(bodyparser.urlencoded({extended:true}))

app.use(express.json())

mongoose.connect(db.mongoURI,{
    useNewURLParser:true 
}).then(function(){
    console.log("Connect to MongoDB Database")
}).catch(function(err){
    console.log(err)
})

require("./models/Game")
var Game = mongoose.model("game")
var Player = mongoose.model("player")

//example routes
app.get("/",  function(req,res){
    //res.send("Hello There you niqupoop")
    res.redirect("gameList.html")
})

app.get("/poop",  function(req,res){
    res.send("Your Butt face")
})

app.use(express.static(__dirname+"/pages"))
app.post("/saveGame", function(req,res){
        console.log(req.body)
        new Game(req.body).save().then(function(){
            //res.send(req.body)
            //res.redirect("index.html")
            res.redirect("gamelist.html")

        })

})

app.post("/findGame", function(req,res){
    Game.find({"game":req.body.game}).then(function(game){
        res.redirect("result.html?id=" + game[0]._id + "&game=" + game[0].game);
    }).catch(function(){
        res.redirect("result.html?game=");
    })
    

})

app.get("/getGames",function(req,res){
    Game.find({}).then(function(game){
        //console.log({game})
        res.json({game})
    })
})

app.post("/updateGame", function(req,res){
    console.log(req.body)

    //res.redirect('gameList.html')
    Game.findByIdAndUpdate(req.body.id, {game:req.body.game}, function(){
    })
    res.redirect("gamelist.html")
    



})
app.post("/getID::id",function(req,res){
    console.log(`game Upadate ${req.body.game._id}`)
    res.redirect("updatePage.html?id:" + req.params.id)
})

app.post("/deleteGame",function(req,res){
    console.log(`game Deletes ${req.body.game._id}`)
        Game.findByIdAndDelete(req.body.game._id).exec()
        res.redirect('gamelist.html')
})

app.get("/sortGame",function(req,res){
   Game.find({}).sort({game : 1}).then(function(list){
    res.json({list});
   });

})

//unity
app.post("/unity", function(req,res){
    console.log("Hello from Unity");
    var newData = {
        "User": req.body.user,
        "FirstName": req.body.firstName,
        "Lastname": req.body.lastName,
        "Date" : req.body.date,
        "Score" : req.body.score
    }
    console.log(newData);
    


});

app.post("/unitySave", function(req,res){
    console.log("Hello from Unity");
    var newData = {
        "User": req.body.user,
        "FirstName": req.body.firstName,
        "Lastname": req.body.lastName,
        "Date" : req.body.date,
        "Score" : req.body.score
    }
    console.log(newData);
    new Player(req.body).save().then(function(){
            console.log(req.body)
    })
    


});


app.get("/SendUnityData", function(req,res){
    console.log("request made");
    var dataToSend = {
        "User": "test",
        "First Name": "vacant",
        "Last name": "best champ",
        "Date" : "8/15/00",
        "Score" : "66608"
    }
    res.send(dataToSend);
})


app.listen(port, function(){
        console.log(`Running on port ${port}`)

})



