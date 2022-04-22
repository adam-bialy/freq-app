// import libraries
const express = require("express");
const fs = require("fs");
const https = require("https");

// load file names
let files = fs.readdirSync(__dirname + "/public/sounds").slice(1);
files.sort(function(a, b) {
  return Number(a.split("Hz")[0]) - Number(b.split("Hz")[0])
});
let dirs = files.map(x => "sounds/" + x)
let freqs = files.map(x => x.split("Hz")[0])

// initialize app
app = express();
app.use(express.static("public"));

// set up routing
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.get("/xdirsxlistx", function(req, res) {
  res.send(dirs)
})

app.get("/xfreqsxlistx", function(req, res) {
  res.send(freqs)
})

// start the app
app.listen(process.env.PORT || 3000, function() {})

// make an empty request to freq-report API to wake it up
https.get("https://freq-report.herokuapp.com/")
