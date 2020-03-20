const express = require('express');
const auth = require('../middleware/auth');

const Comment = require('../models/Comment');

const router = express.Router();

router.get('/', async (req, res) => {
    if (req.query.post) {
        try {
            const comments = await Comment
                .find({post: req.query.post})
                .populate({path: 'user', select: 'fullName'});

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
    commentData.user = req.user._id;

    try {
        const comment = new Comment(commentData);

        await comment.save();
        return res.send({message: 'Comment added', comment});
    } catch (e) {
        return res.status(400).send(e);
    }
});

module.exports = router;
