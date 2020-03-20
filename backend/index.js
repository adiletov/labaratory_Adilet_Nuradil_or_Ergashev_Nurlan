const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const posts = require('./app/posts');
const users = require('./app/users');
const comments = require('./app/comments');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


mongoose.connect(config.dbUrl, config.mongoOptions).then(() => {
    app.use('/posts', posts);
    app.use('/users', users);
    app.use('/comments', comments);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});
