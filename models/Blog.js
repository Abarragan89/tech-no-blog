const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model{};

Blog.init(
    // Define table columns and properties
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        blog_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        blog_text: {
            type: DataTypes.STRING(6000),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    // define config
    {
        sequelize,
        // Don't plurailze name of database talbe
        freezeTableName: true,
        underscored: true,
        modelName: 'blog'
    }
);

module.exports = Blog;