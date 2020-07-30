const {Router} = require('express');
const Link = require('./../models/link');
const auth = require('../middleware/auth.middleware');
const config = require('config');
const shortid = require('shortid');
const link = require('./../models/link');
const router = Router();

router.post('/generate', async (req, res) => {
    try {
        const baseURL = config.get("baseURL");
        const {from} = req.body;

        const code = shortid.generate();

        const existing = await Link.findOne({ from });

        if(existing) {
            return res.json({ link: existing});
        }

        const to = baseURL + '/t/' + code;

        const link = new Link({
            code, to, from, owner: req.user.userId);
        })

    } catch (e) {
        res.status(500).json({
            message: 'Server error'
            
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({ owner: req.user.userId });
        res.json(links);
    } catch (e) {
        res.status(500).json({
            message: 'Server error'
            
    }

    
});

router.get('/:id', async (req, res) => {
    try {
        const link = await Link.findById(req.param.id);
        res.json(link);
        
    } catch (e) {
        res.status(500).json({
            message: 'Server error'
            
    }

});

module.exports(router);