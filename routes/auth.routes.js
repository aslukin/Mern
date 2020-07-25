const { Router } = require('express');
const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config'); 
const router = Router();


// /api/auth
router.post('/register',
    [
        check('email', 'Incorrect e-mail').isEmail(),
        check('password', 'Minimum password length is 8 chars').isLength({ min: 6, max: 32 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult();
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data"
                });
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email: email });
            if (candidate) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const hashedPassword = await bcrypt.hash(password, 'SaltString');
            const user = new User({ email: email, password: hashedPassword });
            await user.save();
            res.status(201).json({ message: 'User created' });

        } catch (e) {
            res.status(500).json({
                message: 'Server error'
            });
        }
    });


router.post('/login',
    [
        check('email', 'Incorrect e-mail').isEmail(),
        check('password', 'Enter the password').exists
    ],
    async (req, res) => {
        try {
            const errors = validationResult();
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Incorrect data"
                });
            }

            const { email, password } = req.body;

            const user = User.findOne({email: email});

            if (!user) {
                return res.status(400).json('Username not found');
            }

            const isMatch = bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({ message: 'incorret password'});
            }

            
            const tocken = jwt.sign(
                { userID: user.id},
                config.get('jwtSecret'),
                { expiresIn: "1h"}
            );

            return res.json({ tocken, userId: user.id });

            // const candidate = await User.findOne({ email: email });
            // if (candidate) {
            //     return res.status(400).json({ message: 'User already exists' });
            // }

            // const hashedPassword = await bcrypt.hash(password, 'SaltString');
            // const user = new User({ email: email, password: hashedPassword });
            // await user.save();
            // res.status(201).json({ message: 'User created' });

        } catch (e) {
            res.status(500).json({
                message: 'Server error'
            });
        }
    });

module.exports = router; 