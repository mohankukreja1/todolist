const route=require('express').Router();
const table=require('../db/models').todos;

route.get('/',(req,res)=>{
    table.findAll().then((todos)=>{
        res.send(todos);
    }).catch((err)=>{
        console.log(err);
    })
})
route.post('/',(req,res)=>{
    table.create({
        task:req.body.task,
        done:false
    }).then(()=>{
        res.redirect('/todos');
    }).catch((err)=>{
        console.log(err);
    })

})

route.post('/:id',(req,res)=>{
    if(isNaN(parseInt(req.params.id))){
        return res.status(404).send({
            message:'send a number'
        })
    }
    table.update({
        done:req.body.done,
        task:req.body.task
    },{
        where:{
            id:req.params.id
        }
    }).then((result)=>{
        res.redirect('/todos');
    }).catch(err=>{
        console.log(err)
    })
})

exports=module.exports={
    route
}