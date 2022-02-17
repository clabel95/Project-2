const router = require('express').Router();
const { Recipes, Ingredients, Saved_recipes, User, User_recipes }  = require('../../models');
const withAuth = require('../../utils/auth');


/// post route to create a new recipe
router.post('/', withAuth, async (req, res) => {
    try{
        // create the model tables for the recipe and use the author_id = login user
        const createRecipe = await Recipes.create({
            ...req.body, author_id: req.session.user_id});
        // create the log for the user_receipes
        const setUser = await User_recipes.create({user_id: req.session.user_id , my_recipe_id: createRecipe.getDataValue('id'),});
        // create the model of each ingredient
        if(req.body.ingredients.length){
            // map all ingredients in the ingredients array and create object
            const mapIngredients = req.body.ingredients.map((ingredient) => {
                    return {recipe_id:createRecipe.getDataValue('id'), ingredients: ingredient,};});
            // bulkCreate thedata table for all ingredients
            const allIngredients = await Ingredients.bulkCreate(mapIngredients);
            res.status(200).json(allIngredients); return;
        }
        res.status(200).json(createRecipe);
    }
    catch (err){ res.status(400).json(err);}
});

// delete route to dele a recipe that was created by loging user
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const deleteRecipe = await Recipes.destroy({
            where: {id: req.params.id, author_id: req.session.user_id},});
        if(!deleteRecipe){res.status(400).json({message: 'No Recipe found with this id!'});return;}
        res.status(200).json(deleteRecipe);
    }
    catch (err){ res.status(500).json(err);}
});

module.exports = router;