var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'src')));

app.get('/',function(req, res) {
    res.send("hello");
});

app.listen(4000, function() {
    console.log("Server started on port 4000");
});
