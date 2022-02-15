const router = require('express').Router();

router.get('/', (req, res) => {
    res.render("home")
})

router.get('/search', (req, res) => {
    res.render("searchHeader")
})

module.exports = router;