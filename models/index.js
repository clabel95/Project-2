//https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-database-client2&ssr=false#overview
const User = require('./User');
const User_recipes = require('./User_recipes');
const Recipes = require('./Recipes');
const Ingredients = require('./Ingredients');
const Saved_recipes = require('./Saved_recipes');

//a user can have many created recipes
User.hasMany(User_recipes, {
    foreignKey:'user_id'
});

//a user can have many saved recipes
User.hasMany(Saved_recipes, {
    foreignKey:'user_id'
});


//a recipe can only have one author
Recipes.belongsTo(User, {
    foreignKey:'user_id'
});

//a recipe can have many ingredients.
Recipes.hasMany(Ingredients,{
    foreignKey:'recipe_id'
})




module.exports = { User_recipes };
module.exports = { Saved_recipes };
module.exports = { Recipes };
module.exports = { Ingredients };
module.exports = { User };
