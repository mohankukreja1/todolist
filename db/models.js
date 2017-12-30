const sequelize=require('sequelize');
const datatype=sequelize.DataTypes;

const db=new sequelize('dbone','userone','passone',{
    host:'localhost',
    dialect:'mysql'
})

const todos=db.define('todos',{
    id:{
        type:datatype.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true
    },
    task:{
        type:datatype.STRING
    },
    done:{
        type:datatype.BOOLEAN,
        default:false
    }



})
db.sync({force:true}).then(()=>{
    console.log('database configured');
}).catch((err)=>{
    console.log(err);
})

exports=module.exports={todos}



