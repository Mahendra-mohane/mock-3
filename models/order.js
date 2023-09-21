const mongoose=require("mongoose")
const orderSchema=new mongoose.Schema({
    user : { type: ObjectId, ref: 'User' },
	 books : [{ type: ObjectId, ref: 'Book' }],
	 totalAmount: Number
});
module.exports=mongoose.model("Order",orderSchema);