const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class User_recipes extends Model{}

User_recipes.init(
    {
        id: {
            //foreign key that links to that user. 
        },
        My_recipe_id: {
            // an array of recipe id's that the user has created.
        },
        Saved_Recipe_id: {
            // an array of recipe id's that the user has saved.
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName:true,
        underscored: true,
        modelName: 'user_recipes'
    }
)

module.exports = User_recipes;