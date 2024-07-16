const express = require('express');
const path = require('path');

const app = express();

//app.use(express.static(__dirname + '/SYSTEM-APP'));
app.get('/*', function (req, res) {
    //res.sendFile(path.join(__dirname + '/SYSTEM-APP/index.html'));
    res.sendFile(path.join(__dirname + '../dist/SYSTEM-APP/index.html'));
});
app.listen(process.env.PORT || 5000 || 8080);