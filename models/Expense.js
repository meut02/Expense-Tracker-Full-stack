const Sequelize=require('sequelize')

const sequelize=require('../util/database')

const Expense=sequelize.define('expense',{
id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
},
price:{
    type:Sequelize.INTEGER,
    allowNull:false
    },

name:{
    type:Sequelize.STRING,
    allowNull:false,
    unique:true
    },
category:{
    type:Sequelize.STRING
   }    
   
})

module.exports=Expense