const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Recipes extends Model{}

Recipes.init(
    {
        id: {
            // id of that recipe which can be saved into the user_recipes arrays
        },
        course: {
            // will either be breakfast lunch dinner or desert
        },
        ingredients: {
            // an array of ingredients that are required for the recipe
            // type: DataTypes.TEXT,
            // get: function(){return JSON.parse(this.getDataValue('ingredients'));},
            // set: function(val){return this.setDataValue("ingredients", JSON.stringify(val));}
        },
        key_ingredient: {
            // a single ingredient that is the centerpiece for that recipe.
        },
        cook_time: {
            // an integer value that represents the minutes required to make this recipe.
        },
        serving_size: {
            // an integer value representing how many people the recipe serves.
        },
        vegitarian: {
            // a boolean value that shows if the recipe is vegitarian or not.
        },
        hot:{
            // a boolean value that shows if the recipe is served hot or cold.
        },
        instructions: {
            // a string of text that lists the steps for creating the dish.
            // type: DataTypes.TEXT,
            // allowNull: false,
        },
        author: {
            // the authors unique id which will be used to retrieve the authors username when displaying the dish.
        }

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName:true,
        underscored: true,
        modelName: 'recipes'
    }
);


module.exports = Recipes;