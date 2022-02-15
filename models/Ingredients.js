const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Ingredients extends Model{}
Ingredients.init(
    {
        id:{ // added by Maribel
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        recipe_id: {
            // id of that recipe which can be saved into the user_recipes arrays
            type: DataTypes.INTEGER,
            references:{
                model:'recipes',
                key:'id' 
            } 
        },
        ingredients: {
            // instead of an array stored here we will store each ingredient with a reference to the recipe id.
            type: DataTypes.STRING,
            allowNull: false,
        },
        

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName:true,
        underscored: true,
        modelName: 'ingredients'
    }
);


module.exports = Ingredients;