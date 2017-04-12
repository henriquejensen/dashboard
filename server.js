const express = require("express");
const path = require("path");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(__dirname));

app.get('*', function (req, res, next) {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port);

console.log("Server running in port "+port);