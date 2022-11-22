const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }

Post.init({
    // add properites here, ex:
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    post: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // createdAt: {
    //     type: DataTypes.DATE,
    //     get() {
    //         return moment(this.getDataValue('createdAt')).format('DD/MM/YYYY')
    //     }
    // }
},
    {
        sequelize
    });

module.exports = Post