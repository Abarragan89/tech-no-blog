const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// define table columns and configuration
User.init(
    {
        // Table column definitions
        id: {
            type: DataTypes.INTEGER,
            // same thing as 'NOT NULL'
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // user column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        // password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                // this means it must be at least 4 characters
                len: [4]
            }
        }
    },
    {
        // hooks (password hashing)
        hooks: {
            // set up beforeCreat lifecycle 'hook'
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecyle
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // Table configuration options
        // Don't automatically create createdAt/updatedAt timestamp fields
        sequelize,
        timestamps: false,
        // Don't plurailze name of database talbe
        freezeTableName: true,
        // Use underscores instead of camel-casing
        underscored: true,
        // Make model name stay lowercase in database 
        modelName: 'user'
    }
);

module.exports = User;