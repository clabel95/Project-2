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

// post route to create a new recipe
router.post('/', async (req, res) => {
    try{
        const createRecipe = await Recipes.create(req.body);
        res.status(200).json(createRecipe);
    }
    catch (err){ res.status(400).json(err);}
});

// delete route to dele a recipe
router.delete('/:id', async (req, res) => {
    try {
        const deleteRecipe = await Recipes.destroy({where: {id: req.params.id},});
        res.status(200).json(deleteRecipe);
    }
    catch (err){ res.status(500).json(err);}
});


module.exports = router;