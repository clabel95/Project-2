const router = require('express').Router();
const { Recipes, Ingredients, Saved_recipes, User, User_recipes }  = require('../models');
const withAuth = require('../utils/auth');

router.get('/addrecipe', (req,res)=>{
    res.render("addrecipe",{
        style: "addrecipe.css"
    })
})

// ~~~~~Done~~~~~~~~~
// login page to create user or log in, if already log in send to homepage
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) { res.redirect('/'); return; }
    res.render('login', {style: "login.css"} ); // ***** need to create a login handler
});

// ~~~~~Done~~~~~~~~~
// homepage gets all recipes
router.get('/', async (req, res) => {
    try{
        const RecipeData = await Recipes.findAll({ limit: 10,
            attributes: ['id','title', 'course', 'cook_time', 'serving_size', 'vegitarian', 'hot', 'key_ingredient', 'instructions'],
            include: [{model: Ingredients, attributes: ['ingredients']}, {model:User, attributes: ['username'] },],
        });
        //serialize data so the template can read it
        const Allrecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        //pass serialized data and session flag into template
        // res.status(200).json(Allrecipe);
        res.render("home", {style:"style.css" , Allrecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
})

// ~~~~~Done~~~~~~~~~
// get one recipe by its id - display it on onhome
router.get('/recipe/:id', async (req, res) => {
    try{
        const RecipeData = await Recipes.findByPk(req.params.id, {
            include: [{model: Ingredients, attributes: ['ingredients'],}, {model:User, attributes: ['username'] },], 
        });
        // validate if id exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that id!' }); return; }
        //serialize data so the template can read it
        const Onerecipe = RecipeData.get({ plain: true });
        
        // res.status(200).json(Onerecipe);
        res.render("recipe", {style:"style.css", Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
})

// ~~~~~Done~~~~~~~~~
// {model:Recipes, through: User_recipes, as: 'many-Recipes'} , {model:User, through: User_recipes, as: 'many-Users'}
// get my recipes - list of recipes created by user
router.get('/user', withAuth,  async (req, res) => { //req.params.author_id
    try{
        const UserData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{model:Recipes, as:'many_Recipes', attributes: ['id','title', 'course', 'cook_time', 'serving_size', 'instructions'], }], // 
        });
        // validate if id exists
        if (!UserData){ res.status(404).json({ message: 'No user found with that id!' }); return; }
        //serialize data so the template can read it
        const user_Data = UserData.get({ plain: true });
        //pass serialized data and session flag into template
        // res.status(200).json(user_Data);
        const userRecipe = user_Data.many_Recipes;
        res.render("user", { style:"style.css", userRecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
})

// ~~~~~Done~~~~~~~~~
// search by recipe main ingredient - display it on home or search header
router.get('/search/:key_ingredient', async (req, res) => {
    try{
        const RecipeData = await Recipes.findAll({limit: 3, where: {key_ingredient: req.params.key_ingredient}});
        // validate if key_ingredient exists
        if (!RecipeData){ res.status(404).json({ message: 'No recipe found with that ingredient!' }); return; }
        //serialize data so the template can read it
        const Onerecipe = RecipeData.map((recipe) => recipe.get({ plain: true }));
        // res.status(200).json(Onerecipe);
        res.render('searchHeader', {style:"style.css", Onerecipe, logged_in: req.session.logged_in });
    }
    catch (err){ res.status(500).json(err); }
})



module.exports = router;