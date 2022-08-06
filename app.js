// import libraries
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const spawn = require("child_process").spawn;
const util = require("util");

// load file names
let files = fs.readdirSync(__dirname + "/public/sounds").slice(1);
files.sort(function(a, b) {
  return Number(a.split("Hz")[0]) - Number(b.split("Hz")[0])
});
let dirs = files.map(x => "sounds/" + x)
let freqs = files.map(x => x.split("Hz")[0])

// initialize app
app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
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

app.post("/", function(req, res) {
  const name = req.body.fName
  const lower = req.body.fLower
  const upper = req.body.fUpper
  const python = spawn("venv/bin/python", ["certificate.py", name, lower, upper])

  python.stdout.on("data", function(data) {
    let file = data.toString().trim()
    res.download(file, function() {
      fs.unlink(file, function(err) {
        if (err) {
          console.log(err);
        }
      })
    })
  })
  python.stderr.on("data", function(data) {
    let error = data.toString()
    res.send(error)
    console.log(error)
  })
  python.on("close", function() {
    console.log("Success")
  })
  //  const url = "https://freq-report.herokuapp.com/?" + "name=" + name + "&lower=" + lower + "&upper=" + upper
  //  res.redirect(url)
})

// start the app
app.listen(process.env.PORT || 3000, function() {})

// // // make an empty request to freq-report API to wake it up
// // https.get("https://freq-report.herokuapp.com/")
