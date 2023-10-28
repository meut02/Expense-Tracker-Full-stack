const User=require('../models/User')

exports.adduser=(async(req,res,next)=>{
    try{
    const name=req.body.Name;
    const email=req.body.Email;
    const password=req.body.Password
  
    const data= await User.create({name:name,email:email,password:password})
    res.status(201).json({newuserdetails:data});
    }
    catch(err){
      res.status(500).json({
        error:err
      })
    }
  })

  exports.getuser=(async(req,res,next)=>{
    try{
    const users=await User.findAll()
    res.status(200).json({allusers:users})
    }
    catch(err){
      res.status(500).json({error:err})
    }
  })

  exports.deleteuser=(async(req,res,next)=>{
    try{
      if(req.params.id=='undefined')
      {
       return res.status(400).json({err:'id is missing'})
      }
    const uid=req.params.id
    await User.destroy({where:{id:uid}})
    res.sendStatus(200);
    }
    catch(err){
      console.log(err)
    }
  })