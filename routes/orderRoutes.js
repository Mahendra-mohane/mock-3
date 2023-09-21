const express=require('express')
const router=express.Router();
const orderController=require('../controllers/orderController')
const authMiddleware=require('../middlewares/authMiddleware');


router.post('/order',authMiddleware,orderController.placeOrder)
router.get('/orders',authMiddleware,orderController.getAllOrders);


module.exports=router;

