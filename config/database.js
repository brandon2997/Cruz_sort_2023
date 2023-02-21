const { mongo } = require("mongoose");

if(process.env.NODE_ENV === "production"){
    module.exports = {mongoURI:"mongodb+srv://bscruz:Dots980@cluster0.uq3cnrh.mongodb.net/?retryWrites=true&w=majority"}
}
else{
    module.exports = {mongoURI:"mongodb://127.0.0.1:27017/gameEntries"}
}