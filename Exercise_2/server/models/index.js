const mongoose = require("mongoose");
module.exports.books = require("./books.js");


function retryDBConection(){
        mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/booksData", {useNewUrlParser: true},
            function (err) {
                if (err) {
                    console.log("delaying");
                    setTimeout(retryDBConection, 3000);
                }
            });
}
retryDBConection();