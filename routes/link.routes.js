const { Router } = require('express');
const Link = require('./../models/link');
const auth = require('../middleware/auth.middleware');
const config = require('config');
const shortid = require('shortid');
const router = Router();


// router.post('/generate', auth, async (req, res) => {
router.post('/generate', auth, async (req, res) => {
    try {
       
        const baseURL = config.get("baseURL");
        const { from, userId } = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({ from, owner: userId });

        if (existing) {
            return res.json({ link: existing });
        }

        const to = baseURL + '/t/' + code;

        const link = new Link({
            code: code, 
            from: from, 
            to: to,
            owner: userId
        })


        await link.save();

        res.status(201).json({link});
        
    } catch (e) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});


router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userID });
        res.json(links);
    } catch (e) {
        res.status(500).json({
            message: 'Server error'
        });
    }
});

    router.get('/:id', auth, async (req, res) => {
        try {
        
        const link = await Link.findById(req.params.id);
        res.json(link);

    } catch (e) {
        res.status(500).json({
            message: 'Server error in getitem'

        });
    }
});



module.exports = router;