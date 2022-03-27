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

router.get('/:id', (req, res)=> {
    Blog.findOne({
        where: {
            id: req.params.id
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
        console.log(blog)
        console.log(blog.comments[0])
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

// Add a comment to a Blog
// router.put('/:id', (req, res) => {
//     Blog.update(
//         {
            
//         }
//     )
// })
module.exports = router;