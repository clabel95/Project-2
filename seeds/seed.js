const sequelize = require('../config/connection');
const { Recipes, Ingredients, Saved_recipes, User, User_recipes } = require('../models');

const users_seed_data = require('./usersSeedData.json');
const recipe_seed_data = require('./recipeSeedData.json');
const USERrecipe_seed_data = require('./userRecipesData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
     //users seeds 
     const users = await User.bulkCreate(users_seed_data,{   //might need to change these still not sure if I am doing this right
        individualHooks: true,
        returning: true,
    });
    console.log('\n----- USERS SEEDED -----\n');
    
    // receipts seeds
    for ( const recipe of recipe_seed_data ) {
        // for every receipt created - a user needs to be created
        const NEWrecipe =  await Recipes.create({
             ...recipe, author_id: recipe.author_id,
         }); 
            // for every receipt, each ingredient a model is created
            for (const ingredient of recipe.ingredients){
                const newIngredient = await Ingredients.create({
                    ingredients: ingredient, recipe_id: NEWrecipe.getDataValue('id'),
                });
            }
    }
    console.log('\n----- RECIPES SEEDED -----\n');

    const userREcipe = await User_recipes.bulkCreate(USERrecipe_seed_data);

    console.log('\n----- USER RECIPES SEEDED -----\n');

    process.exit(0);
}
seedDatabase();