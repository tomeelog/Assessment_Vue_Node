const express = require('express');
const app = express();
var fs = require('fs')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
var morgan = require('morgan');
var path = require('path');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const eventRoute = require('./routes/events');

dotenv.config();

//connect to db
mongoose.connect(
    process.env.DB_CONNECT, { useNewUrlParser: true}, () => console.log('connected to db')
);
app.use(express.json()); 
//import routes
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);
app.use('/api/events', eventRoute);

morgan.token('body', (req, res) => JSON.stringify(req.body));

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('[:date[clf]] :method :url :status :response-time ms - :res[content-length] :body - :req[content-length]', { stream: accessLogStream }));
// Route Middleware

app.listen(3000, () => console.log('Server up and running'));