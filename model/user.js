const mongoose=require('mongoose');
const {Schema}=mongoose;

const UserSchema=new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [{type:Schema.Types.ObjectId, ref:'role'}],
    permit:[{type: Schema.Types.ObjectId, ref: 'permit'}],
    created_at: {type: Date, default:Date.now}
})

const user=mongoose.model("user",UserSchema);
module.exports=user;