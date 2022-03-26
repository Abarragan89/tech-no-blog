const router = require('express').Router();
const { Blog, User } = require('../models')


router.get('/', (req, res) => {
    Blog.findAll({
        include:[
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBlogData => {
        const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
        res.render('homepage', { blogs })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});


// router.get('/', (req, res) => {
//     res.render('homepage');
// })


module.exports = router;