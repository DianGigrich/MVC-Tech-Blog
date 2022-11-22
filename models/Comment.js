const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init({
    // add properites here, ex:
    comment: {
         type: DataTypes.STRING,
         allowNull:false
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

module.exports=Comment