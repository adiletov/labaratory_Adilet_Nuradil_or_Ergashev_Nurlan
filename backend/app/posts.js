const express = require('express');
const path = require('path');
const nanoid = require('nanoid');
const multer = require('multer');

const config = require('../config');
const auth = require('../middleware/auth');
const Post = require('../models/Post');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post
            .find()
            .select(['user', 'title', 'image', 'datetime'])
            .sort({datetime: -1})
            .populate({path: 'user', select: 'username'});

        return res.send(posts);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Post
            .findById(req.params.id)
            .populate({path: 'user', select: 'username'});

        return res.send(post);
    } catch {
        return res.sendStatus(500);
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    if (req.body.description || req.body.image) {

        const postData = req.body;
        postData.user = req.user._id;
        postData.datetime = new Date().toISOString();

        if (req.file) {
            postData.image = req.file.filename;
        }

        try {
            const post = new Post(postData);

            await post.save();
            return res.send({message: 'Post added', post});
        } catch (e) {
            return res.status(400).send(e);
        }

    } else {
        return res.status(400).send({error: 'Add description or image!'});
    }
});

module.exports = router;
