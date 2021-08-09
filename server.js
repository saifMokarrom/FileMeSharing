const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDb = require('./config/db');
const path = require('path');

//to tell node where static folder is 
app.use(express.static('public'));


connectDb();
//for read json data cause I need this to send mail 
app.use(express.json());

//Templates
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//---------Routes Here
//upload
app.use('/api/files', require('./routes/files'));
//download page link
app.use('/files',require('./routes/show'));
app.use('/files/download', require('./routes/download'));

app.listen(PORT, console.log(`Listening on port ${PORT}.`));