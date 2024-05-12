// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// API :input enpoint...
{
  /* 
let responseObject = {};
app.get("/api/:input", (req, res) => {
  console.log(req.params);
  let input = req.params.input;
  console.log(typeof input);
  if (input.includes("-")) {
    responseObject["unix"] = new Date(input).getTime();
    responseObject["utc"] = new Date(input).toUTCString();
  } else {
    input = parseInt(input);
    console.log(typeof input);
    responseObject["unix"] = new Date(input).getTime();
    responseObject["utc"] = new Date(input).toUTCString();
  }

  if (!responseObject["unix"] || !responseObject["utc"]) {
    res.json({ error: "Invalid Date" });
  }

  res.json(responseObject);
});

// API empty :input endpoint...
app.get("/api", (req, res) => {
  responseObject["unix"] = new Date().getTime();
  responseObject["utc"] = new Date().toUTCString();

  res.json(responseObject);
});
*/
}

app.get("/api/:date?", (req, res) => {
  console.log(req.params.date);

  if (/^\d{4}-\d{2}-\d{2}/.test(req.params.date)) {
    req.params.date = new Date(req.params.date).toUTCString();
    var timestp = Date.parse(req.params.date);
    res.json({ unix: timestp, utc: req.params.date });
  } else if (/\d{13}/.test(req.params.date)) {
    var time_unix = parseInt(req.params.date);
    req.params.date = new Date(time_unix * 1).toUTCString();
    res.json({ unix: time_unix, utc: req.params.date });
  } else if (/^\d{2} /.test(req.params.date)) {
    var UTC_string = " UTC";
    req.params.date = req.params.date.concat(" ", UTC_string);
    console.log(req.params.date);
    req.params.date = new Date(req.params.date).toUTCString();
    console.log(req.params.date);
    if (req.params.date != "Invalid Date") {
      var timestp = Date.parse(req.params.date);
      res.json({ unix: timestp, utc: req.params.date });
    } else {
      req.params.date = "Invalid Date";
      res.json({ error: req.params.date });
    }
  } else if (req.params.date) {
    req.params.date = "Invalid Date";
    res.json({ error: req.params.date });
  } else if (/\/$/.test(req.params.date)) {
    req.params.date = "Invalid Date";
    res.json({ error: req.params.date });
  } else {
    var time = new Date().getTime();
    req.params.date = new Date(time * 1).toUTCString();
    res.json({ unix: time, utc: req.params.date });
  }

  console.log(req.params);
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
