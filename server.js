const express = require('express');
const path = require('path');

const app = express();

//app.use(express.static(__dirname + '/SYSTEM-APP'));
app.use(express.static('./dist/system-app'));
app.get('/*', function (req, res) {
    //res.sendFile(path.join(__dirname + '/SYSTEM-APP/index.html'));
    res.sendFile(index.html, {root: 'dist/system-app'}
    );
});
app.listen(process.env.PORT || 5000 || 8080);