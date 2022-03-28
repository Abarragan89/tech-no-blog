const router = require('express').Router();
const { Blog, User, Comment } = require('../models')

router.get('/', (req, res) => {
    Blog.findAll({
        where: {
            user_id: req.session.user_id
        }
    })
    .then(dbBlogData => {
        const blogs = dbBlogData.map(post => post.get({ plain: true }));
        res.render('dashboard', { blogs, loggedIn: req.session.loggedIn, user_id: req.session.user_id, username: req.session.username })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

router.get('/create-blog/:id', (req, res) => {
    res.render('create-blog', {loggedIn: req.session.loggedIn})
})

module.exports = router;