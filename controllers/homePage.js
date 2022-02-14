const router = require('express').Router();
const sequelize = require('../config/connection');
const { Recipes } = require('../models'); //, User, User_recipes }

// get route to display all recipes
router.get('/', async (req,res) => {
    try{
        const recipeALL = await Recipes.findAll();
        res.status(200).json(recipeALL);
    }
    catch (err){ res.status(500).json(err);}
});






module.exports = router;