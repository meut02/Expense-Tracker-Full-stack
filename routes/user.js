const express=require('express')

const userController=require('../controllers/user')

const router=express.Router();


router.post('/Add-user',userController.adduser)

router.post('/login',userController.login)





module.exports=router

