// import libraries
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const spawn = require("child_process").spawn;

// load file names
let files = fs.readdirSync(__dirname + "/public/sounds").slice(1);
files.sort((a, b) => {
  return Number(a.split("Hz")[0]) - Number(b.split("Hz")[0]);
});
let dirs = files.map((x) => "sounds/" + x);
let freqs = files.map((x) => x.split("Hz")[0]);

// initialize app
app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static("public"));

// set up routing
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/xdirsxlistx", (req, res) => {
  res.send(dirs);
});

app.get("/xfreqsxlistx", (req, res) => {
  res.send(freqs);
});

app.post("/", (req, res) => {
  const name = req.body.fName;
  const lower = req.body.fLower;
  const upper = req.body.fUpper;
  const python = spawn("python3", ["certificate.py", name, lower, upper]);

  python.stdout.on("data", (data) => {
    let file = data.toString().trim();
    res.download(file, () => {
      fs.unlink(file, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  });
  python.stderr.on("data", (data) => {
    let error = data.toString();
    res.send(error);
    console.log(error);
  });
  python.on("close", () => {
    console.log("Success");
  });
});

// start the app
app.listen(process.env.PORT || 3000);
