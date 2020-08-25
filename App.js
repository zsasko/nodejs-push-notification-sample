const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const app = express();

const { getHomePage, sendMessage, sendToken } = require('./routes/index');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('connected to database');
});
global.db = db;

app.set('port', process.env.PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true  }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
  }));

app.get('/', getHomePage);

app.post('/send-message', sendMessage);
app.post('/send-token', sendToken);

app.listen(process.env.PORT, () => {
    console.log(`server running on port: ${process.env.PORT}`);
});