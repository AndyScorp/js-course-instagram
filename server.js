const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_USER_PWD}@js-course-instagram-shard-00-00-l5lfy.mongodb.net:27017,js-course-instagram-shard-00-01-l5lfy.mongodb.net:27017,js-course-instagram-shard-00-02-l5lfy.mongodb.net:27017/instagram?ssl=true&replicaSet=js-course-instagram-shard-0&authSource=admin`);

const app = express();
const PORT = process.env.PORT || 3000;
const db = mongoose.connection;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.get('/', (req, res) => {
    res.type('html');
    res.send('index.html');
});

app.use('/api', require('./main/router/api'));


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('Connected to mongo');
});

app.listen(PORT, () => {
    console.log('server start http://localhost:' + PORT);
});
