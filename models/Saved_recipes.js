const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Saved_recipes extends Model{}

Saved_recipes.init(
    {
        user_id: {
            //foreign key that links to that user. 
            type: DataTypes.INTEGER,
            references: {
                model:'user',
                key:'id'
            }
        },
        saved_recipe_id: {
            // instead of an array stored here we will store each recipe with a reference to the users id.
            type: DataTypes.INTEGER,
            reference:{
                model:'recipes',
                key:'id',
            }

        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName:true,
        underscored: true,
        modelName: 'saved_recipes'
    }
)

module.exports = Saved_recipes;