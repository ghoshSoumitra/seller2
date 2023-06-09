const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
  productName:{
        type:String,
        required:true
    },
    mrp:{
        type:Number,
        required:true
    },
    sp:{
        type:Number,
        required:true
    },
    qty:{
        type:Number,
        required:true
    },
    images:{
      type:String
    }
})
module.exports=mongoose.model('Inventory',UserSchema);
