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
});
// api/users/login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    // make a session using the information in the database associated with that use
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'No user with that email exists'})
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password)
        if(!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'})
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            console.log('You\'re logged in');
            res.json({ user: dbUserData, message: 'You\'re logged in'});
        });
    })
});

router.post('/signup', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password,
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json(dbUserData)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// POST api/users/logout
router.post("/logout", (req, res) => {
if (req.session.loggedIn) {
    req.session.destroy(() => {
    res.status(204).json({ message: "You are now logged out!" }).end();
    });
} else {
    res.status(404).end();
}
});

module.exports = router;