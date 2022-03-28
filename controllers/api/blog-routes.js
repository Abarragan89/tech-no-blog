const router = require('express').Router();
const { Blog, Comment, User } = require('../../models');


router.get('/', (req, res) => {
    Blog.findAll({
        include:[
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbBlogData => res.json(dbBlogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:blog_id/:user_id', (req, res)=> {
    Blog.findOne({
        where: {
            id: req.params.blog_id
        },
        include: {
            model: Comment,
            include: {
                model: User,
                attributes: ['username']
            }
        }
    })
    .then(dbBlogData => {
        const blog = dbBlogData.get({ plain: true });
        const comments = blog.comments
        res.render('single-blog', { comments, blog, loggedIn: req.session.loggedIn })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    Blog.create({
        blog_title: req.body.blog_title,
        blog_text: req.body.blog_text,
        user_id: req.body.user_id
    })
    .then(dbBlogData => {
        res.json(dbBlogData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/edit-post/:id', (req, res) => {
    Blog.update(
        {
            blog_title: req.body.blog_title,
            blog_text: req.body.blog_text,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbBlogData => {
        res.json(dbBlogData)
    })
})
router.get('/edit-post/:id', (req, res) => {
    Blog.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogData => {
        const blog = dbBlogData.get({ plain: true })
        res.render('edit-blog', blog)
    })
})

router.delete('/edit-post/:id', (req, res) => {
    Blog.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbBlogData => {
        res.json(dbBlogData)
    })
})

module.exports = router;