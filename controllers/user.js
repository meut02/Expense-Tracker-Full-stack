const User=require('../models/User')

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

  
    const data= await User.create({name:name,email:email,password:password})
    res.status(201).json({newuserdetails:data});
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
       if(user.password==Password)
        {
          res.status(200).json({message:'user log in succesfull'})
      }
     else{
        res.status(401).json({error:'Invald Credentials'})
      }
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