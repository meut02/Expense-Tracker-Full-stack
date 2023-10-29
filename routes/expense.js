const express=require('express')

const router=express.Router();

const userController=require('../controllers/user')

router.post('/Add-expense',userController.addexpense)

router.get('/Get-expense',userController.getexpense)

router.delete('/Delete-expense/:id',userController.deletexpense)

module.exports=router