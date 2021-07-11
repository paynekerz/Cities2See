const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Search extends Model {}

Search.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        regionCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        population: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        elevationMeters: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        timezone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        latitude: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        longitude: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },

    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName: 'search',
      }
);

module.exports = Search;