const User=require('../models/User')

const Expense=require('../models/Expense')

const bcrypt=require('bcrypt')

exports.adduser=(async(req,res,next)=>{
    try{
    const name=req.body.Name;
    const email=req.body.Email;
    const password=req.body.Password

    if (!name || !email || !password) {
      return res.status(400).json({
        error: 'Missing mandatory item. Please provide a name, email, and password.'
      });
    }

    /*const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        error: 'User already exists. Please choose a different email.'
      });
    }*/
    const saltround=10
    bcrypt.hash(password,saltround,async(err,hash)=>{
      console.log(err)
      const data= await User.create({name,email,password:hash})
      res.status(201).json({newuserdetails:data})
    })  
   ;
    }
    catch(err){
      res.status(500).json({
        error:err
      })
    }
  })

  exports.login=async(req,res)=>{
    const {Email,Password}= req.body

    try{
      const user=await User.findOne({where:{email:Email}})
      
      if(user){
        bcrypt.compare(Password,user.password,(err,result)=>{
          if(!err && result)
          {
            
            res.status(200).json({message:'user log in succesfull'})
        }
       else{
          res.status(401).json({error:'Invald Credentials'})
        }

        })
      
    }
    else{
      res.status(404).json({error:'User Not Found'})
    }
  }
  catch(err){
    console.error(err)
    res.status(500).json({error:'Internal Server Error'})
  }
  }

  exports.addexpense=(async(req,res)=>{
    try{
      const price=req.body.Price
      const name=req.body.Name
      const category=req.body.Category

      const expense=await Expense.create({price,name,category})
      res.status(201).json({expense:expense})
    }
    catch(err){
        res.status(500).json({err:err})
    }
  })



  exports.getexpense=(async(req,res,next)=>{
    try{
    const expense=await Expense.findAll()
    res.status(200).json({allexpense:expense})
    }
    catch(err){
      res.status(500).json({error:err})
    }
  })

  exports.deletexpense=(async(req,res,next)=>{
    try{
      if(req.params.id=='undefined')
      {
       return res.status(400).json({err:'id is missing'})
      }
    const uid=req.params.id
    const expensedeleted=await Expense.destroy({where:{id:uid}})
    res.status(200).json({message:expensedeleted});
    }
    catch(err){
      console.log(err)
    }
  })