const router = require('express').Router();
const { User, Blog } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password']},
        include: [
            {
                model: Blog,
            }
        ]
    })
    .then(dbUserData =>
        res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).console.log('No user with that ID found.')
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})


router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
    .then(dbUserData => {
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});


module.exports = router;