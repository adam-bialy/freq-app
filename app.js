const express = require("express");
const fs = require("fs");
const https = require("https");

app = express();
app.use(express.static("public"));
// const files = fs.readdirSync("/sounds")
// console.log(files)

app.get("/", function(req,res) {
  res.sendFile(__dirname+"/index.html")
})

app.listen(3000)
