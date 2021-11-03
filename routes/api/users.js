const express = require('express');
const router = express.Router();

//Item Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', (req, res) => {
    User.find()
        .sort({date: -1})
        .then(users => res.json(users))
})

// @route   POST api/user
// @desc    Create a user
// @access  Public
router.post('/', (req, res) => {
    const newUser = new User({
        name: req.body.name,
        password: req.body.password
    });

    newUser.save().then(user => res.json(user));
})

// @route   POST api/users
// @desc    Create a user
// @access  Public
router.delete('/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success : false}));
});
module.exports = router;