const express = require('express');
const auth = require('../middleware/auth');

const Comment = require('../models/Comment');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.post) {
        try {
            const comments = await Comment
                .find({post: req.query.post})
                .populate({path: 'user', select: 'username'});
            return res.send(comments);
        } catch {
            return res.sendStatus(400);
        }
    } else {
        return res.sendStatus(400);
    }
});


router.post('/', auth, async (req, res) => {
    const commentData = req.body;
    const user = req.user;
    commentData.user = user._id;

    const comment = new Comment(commentData);

    try {
        await comment.save();
        return res.send({message: 'Comment added', comment});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;
