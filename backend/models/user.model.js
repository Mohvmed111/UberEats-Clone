import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    role:{
        type:String,
        enum:['customer', 'restaurant', 'driver', 'admin'],
        default:'customer'
    },
    phone:String,
    avatar: String,
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);