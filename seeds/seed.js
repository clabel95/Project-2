const sequelize = require('../config/connection');
const { Recipes, User, User_recipes } = require('../models');

const users_seed_data = require('./usersSeedData.json');
const recipe_seed_data = require('./recipeSeedData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    
    //these are dummy users and are only for demonstration 
    const users = await User.bulkCreate(users_seed_data,{   //might need to change these still not sure if I am doing this right
        individualHooks: true,
        returning: true,
    });

    const recipes = await Recipes.bulkCreate(recipe_seed_data, {        //might need to change these still not sure if I am doing this right
        individualHooks: true,
        returning: true,
    });

    process.exit(0);
}
seedDatabase();