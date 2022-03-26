const router = require('express').Router();
const userRoutes = require('./users-routes');
const commentRoutes = require('./comments-routes');
const blogRoutes = require('./blogRoutes');


router.use('/users', userRoutes);
router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);


module.exports = router;