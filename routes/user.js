const path=require('path')

const express=require('express')

const userController=require('../controllers/user')

const router=express.Router();


router.post('/Add-user',userController.adduser)

router.get('/Get-user',userController.getuser)

router.delete('/Delete-user/:id',userController.deleteuser)

module.exports=router

