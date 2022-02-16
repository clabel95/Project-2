const router = require('express').Router();
const { Recipes, Ingredients, Saved_recipes, User, User_recipes }  = require('../models');
const withAuth = require('../utils/auth');

// homepage gets all recipes
router.get('/', async (req, res) => {
    try{
        const RecipeData = await Recipes.findAll({
            attributes: ['title', 'course', 'cook_time', 'serving_size', 'vegitarian', 'hot', 'instructions'],
            include: [{model: Ingredients, attributes: ['ingredients']}, {model:User, attributes: ['username'] },],
        });
        //serialize data so the template can read it
        console.log(RecipeData.ingredients);
        const Allrecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        //pass serialized data and session flag into template
        // const ONEingredient = Allrecipe.filter(( ingredients ).map((ingredient) => ingredient)))
        // .map(({ id }) => id);

        console.log(Allrecipe.ingredients);
        // res.status(200).json(Allrecipe);
        res.render("home", { Allrecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
})

// get one recipe by its id - display it on onhome
router.get('/recipe/:id', async (req, res) => {
    try{
        const RecipeData = await Recipes.findByPk(req.params.id, {
            include: [{model: Ingredients}, {model:User, attributes: ['username'] },], 
        });
        // validate if id exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that id!' }); return; }
        //serialize data so the template can read it
        const Onerecipe = RecipeData.get({ plain: true });
        //pass serialized data and session flag into template
        // res.status(200).json(Onerecipe);
        res.render("home", { ...Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
})

// ~~~~~Done~~~~~~~~~
// {model:Recipes, through: User_recipes, as: 'many-Recipes'} , {model:User, through: User_recipes, as: 'many-Users'}
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

// ~~~~~~get my saved recipes - list of recipes created by user - number of times saved
router.get('/recipe/:saved_recipes', (req, res) => {
    res.render("home")
})

// search by author  - display it on home or search header
router.get('/search/:id', async (req, res) => {
    try{
        const RecipeData = await Recipes.findByPk(req.params.id, {
            include: [{model: Ingredients}, {model:User, attributes: ['name'] },], //{model:User, through: User_recipes, as: 'many-Users'},
        });
        // validate if id exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that id!' }); return; }
        //serialize data so the template can read it
        const Onerecipe = RecipeData.get({ plain: true });
        //pass serialized data and session flag into template
        // res.status(200).json(user_Data);
        res.render("searchHeader", { ...Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
})

// search by ingredient - display it on home or search header
router.get('/search/:ingredients', (req, res) => {
    // console.log("inside params ");
    // console.log(req.params);
    res.render("searchHeader")
})

// search by recipe name - display it on home or search header
router.get('/search/:title', (req, res) => {
    res.render("searchHeader")
})

// search by recipe course - display it on home or search header
router.get('/search/:course', (req, res) => {
    res.render("searchHeader")
})

// search by recipe main ingredient - display it on home or search header
router.get('/search/:key_ingredient', (req, res) => {
    res.render("searchHeader")
})

// search by recipe main preptime - display it on home or search header
router.get('/search/:cook_time', (req, res) => {
    res.render("searchHeader")
})

// ~~~~~Done~~~~~~~~~
// login page to create user or log in, if already log in send to homepage
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) { res.redirect('/'); return; }
    res.render('login'); // ***** need to create a login handler
});

module.exports = router;