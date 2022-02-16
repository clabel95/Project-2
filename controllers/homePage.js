const router = require('express').Router();

// get my recipes - list of recipes created by user
router.get('/user/:author_id', async (req, res) => {
    try{
        const UserData = await User.findByPk(req.params.author_id, {
            attributes: { exclude: ['password'] },
            include: [{model:Recipes, as:'many-Recipes', attributes: ['title', 'course', 'cook_time', 'serving_size', 'instructions'], }], // 
        });
        // validate if id exists
        if (!UserData){ res.status(404).json({ message: 'No user found with that id!' }); return; }
        //serialize data so the template can read it
        const user_Data = UserData.get({ plain: true });
        //pass serialized data and session flag into template
        // res.status(200).json(user_Data);
        res.render("home", { ...user_Data, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
})

// search by recipe course - display it on home or search header
router.get('/search/:course', (req, res) => {
    res.render("searchHeader")
})

// login page to create user or log in, if already log in send to homepage
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) { res.redirect('/home'); return; }
    res.render('login');
});

module.exports = router;