const router = require('express').Router();
const verify = require('./verifyToken');


router.get('/', verify, (req, res) => {

    res.json({
        post: { title: 'my title', description: 'Testing api service' }
    });
});

module.exports = router; 