const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Recipes extends Model{}

Recipes.init(
    {
        id: {
            // id of that recipe which can be saved into the user_recipes arrays
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        course: {
            // will either be breakfast, lunch, dinner, or desert
            type: DataTypes.STRING,
            allowNull: false,
        },
        // added by Maribel
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        key_ingredient: {
            // a single ingredient that is the centerpiece for that recipe.
            type: DataTypes.STRING,
            allowNull: false,
        },
        cook_time: {
            // an integer value that represents the minutes required to make this recipe.
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        serving_size: {
            // an integer value representing how many people the recipe serves.
            type:DataTypes.INTEGER,
            allowNull:false,
        },
        vegitarian: {
            // a boolean value that shows if the recipe is vegitarian or not.
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        hot:{
            // a boolean value that shows if the recipe is served hot or cold.
            type:DataTypes.BOOLEAN,
            allowNull:false,
        },
        instructions: {
            // a string of text that lists the steps for creating the dish.
            //changed from string to TEXT since items to store are big
            type:DataTypes.TEXT,
            allowNull:false,
        },
        author_id: {
            // the authors unique id which will be used to retrieve the authors username when displaying the dish.
            type:DataTypes.INTEGER,
            references:{
                model:'user',
                Key:'id'   
            } 
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