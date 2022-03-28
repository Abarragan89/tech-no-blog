const router = require('express').Router();
const { Blog, User } = require('../models')


router.get('/', (req, res) => {
    Blog.findAll({
        include:[
            {
                model: User
            }
        ]
    })
    .then(dbBlogData => {
        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
        console.log(blogs)
        res.render('homepage', { 
            blogs, 
            loggedIn: req.session.loggedIn, 
            user_id: req.session.user_id, 
            username: req.session.username 
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup');
});

module.exports = router;