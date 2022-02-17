//https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2&ssr=false#overview
const User = require('./User');
const User_recipes = require('./User_recipes');
const Recipes = require('./Recipes');
const Ingredients = require('./Ingredients');
const Saved_recipes = require('./Saved_recipes');

//user has many user recipes as well as saved recipes

//a user can have many created recipes
// User.hasMany(User_recipes, {
//     foreignKey:'user_id'
// });

//a user can have many saved recipes
// User.hasMany(Saved_recipes, {
//     foreignKey:'user_id'
// });

//users can belong to many different recipes.
User.belongsToMany(Recipes,{
    through: {model: User_recipes, unique: false},
    as: 'many-Recipes',
    foreignKey: 'user_id',
});


// //each recipe in user recipes belongs to a single user.
// User_recipes.belongsTo(User,{
//     foreignKey:'user_id'
// });


// //there can be many recipes in the user recipes list.
// User_recipes.hasMany(Recipes,{
//     foreignKey:'my_recipe_id'
// });


// //there are many recipes that can be saved recipes.
// Saved_recipes.hasMany(Recipes, {
//     foreignKey:'saved_recipe_id'
// });

//each saved recipe belongs to a single user.
Saved_recipes.belongsTo(User,{
    foreignKey:'user_id'
})

//each recipe belongs to one user.
Recipes.belongsToMany(User,{
    through: {model: User_recipes, unique: false},
    as: 'many-Users',
    foreignKey: 'my_recipe_id',
});

//each recipe could belong to many different saved recipes.
Recipes.hasMany(Saved_recipes,{
    foreignKey:'saved_recipe_id'
});

//each recipe has one author
// changed from hasOne to belongs to, error otherwise when loading seeds
Recipes.belongsTo(User,{
    foreignKey:'author_id'
});

//recipes have many ingredients
Recipes.hasMany(Ingredients,{
    foreignKey:'recipe_id',
    onDelete: 'CASCADE',
});

//each ingredient belongs to one recipe
Ingredients.belongsTo(Recipes,{
    foreignKey:'recipe_id'
})

// comment it out due to being repetition of line 61
// //a recipe can have many ingredients.
// Recipes.hasMany(Ingredients,{
//     foreignKey:'recipe_id'
// });

// Saved_recipes.hasMany(Recipes,{
//     foreignKey:'saved_recipe_id'
// });


// //a recipe can only have one author
// Recipes.belongsTo(User, {
//     foreignKey:'user_id'
// });


module.exports = {Recipes, Ingredients, Saved_recipes, User, User_recipes };

// comment it out and replace it with line 86, it was giving errors otherwise
// module.exports = { User_recipes };
// module.exports = { Saved_recipes };
// module.exports = { Recipes };
// module.exports = { Ingredients };
// module.exports = { User };
