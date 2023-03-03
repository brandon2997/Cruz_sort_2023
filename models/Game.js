var mongoose = require("mongoose")
var Schema = mongoose.Schema
var playSchema = mongoose.Schema
/*var Schema = new Schema({
    game:{
        type:String,
        required:true



    }
})*/
var playSchema = new Schema({
    
        user:String,
        firstName:String,
        lastName:String,
        date:String,
        score:String
    
})


//mongoose.model("game", Schema)
mongoose.model("player",playSchema)
