const express = require("express");
const { join } = require("path");
const port = process.env.PORT || 8000;
const app = express();

app.use(express.static(join(__dirname, 'public')));

app.get('*', function (req, res, next) {
  res.sendFile(join(__dirname, "public", 'index.html'));
});

app.listen(port);

console.log("Server running in port "+port);