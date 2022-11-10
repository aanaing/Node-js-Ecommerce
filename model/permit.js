const mongoose=require('mongoose');
const {Schema}=mongoose;

const permitSchema=new Schema({
    name: {type: String, required: true, unique: true}
    
})

const permit=mongoose.model('permit',permitSchema);
module.exports=permit;