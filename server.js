const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();
let publicPath = path.join(__dirname, '../public');


app.use(express.static(publicPath), (req, res, next) => {
     console.log(req.url);
     next()
});
app.use('/', (req, res, next) => {
    let newChirp = { username: req.body.username, message: req.body.message };
  
    if (fs.existsSync('chirps.json')) {
      chirps = JSON.parse(fs.readFileSync('chirps.json'));
  
      chirps = [newChirp];
  
      fs.writeFile('chirps.json', JSON.stringify(chirps), (err) => console.err(err));
    }
  
    next();
  });
  
// not sure if it should be a tem-literal
app.post('/formsubmissions', (req, res, next) => {
    res.send(`Username: {req.body.username}
              Message: {req.body.message}`);
  });