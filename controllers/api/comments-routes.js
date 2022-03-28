const router = require('express').Router();
const Comment = require('../../models/Comment');


router.get('/', (req, res) => {
    Comment.findAll({})
    .then(dbCommentData => res.json(dbCommentData))
    .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/:blog_id/:user_id', (req, res) => {
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.params.blog_id,
        blog_id: req.params.user_id
    })
    .then(dbCommentData => {
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
