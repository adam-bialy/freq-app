const express = require("express");
const fs = require("fs");
const https = require("https");


var files = fs.readdirSync(__dirname+"/public/sounds").slice(1);
files.sort(function(a,b) {
  return Number(a.split("Hz")[0]) - Number(b.split("Hz")[0])
});
var dirs = files.map(x => "sounds/" + x)
var freqs = files.map(x => x.split("Hz")[0])


app = express();
app.use(express.static("public"));


app.get("/", function(req,res) {
  res.sendFile(__dirname+"/index.html")
})

app.get("/xdirsxlistx", function(req,res) {
  res.send(dirs)
})

app.get("/xfreqsxlistx", function(req,res) {
  res.send(freqs)
})


app.listen(3000)
