const router = require('express').Router();
const Blog = require('../../models/Blog');
const Comment = require('../../models/Comment');
const User = require('../../models/User');

router.get('/', (req, res) => {
    Blog.findAll({
        include:[
            {
                model: User,
                attributes: ['username']
            }
        ]
            // {
            //     model: Comment,
            //     key: "blog_id"
            // }
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
        }
    })
    .then(dbBlogData => {
        if(!dbBlogData) {
            res.status(404).console.log('No user with that ID');
            return;
        }
        res.json(dbBlogData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
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

module.exports = router;