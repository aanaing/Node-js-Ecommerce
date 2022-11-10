const DB=require('../model/permit');
const helper=require('../utils/msg');

const all=async(req,res,next)=>{
    const result=await DB.find().select('-__v');
    helper.fMsg(res,"Get All permit data",result);
}

const add=async(req,res,next)=>{
    const permitDb=await DB.findOne({name:req.body.name});
    
    if(permitDb) 
    next(new Error("Permission name is already in use"));
    else {
        let result=await new DB(req.body).save();
        helper.fMsg(res,"Add permission",result);
    }
}

const getSingle=async(req,res,next)=>{
    let permitSingle=await DB.findById(req.params.id).select('-__v');
    if(permitSingle) helper.fMsg(res,"Get single permission data",permitSingle);
    else res.json({msg:"Can't find by id"});
}

const patch=async(req,res,next)=>{
    let permitId=await DB.findById(req.params.id);
    if(permitId){
        await DB.findByIdAndUpdate(permitId._id,req.body);
        let result=await DB.findById(permitId._id).select('-__v');
        helper.fMsg(res,"Updated permissiion",result);
    }else next(new(Error("Can't find by id")));
}

const drop=async(req,res,next)=>{
    let deleteId=await DB.findById(req.params.id);
    if(deleteId){
        let result=await DB.findByIdAndDelete(deleteId._id).select('-__v');
        helper.fMsg(res,"Deleted id",result);
    }else next(new Error("Can't find by id"));
}

module.exports={
    add,
    all,
    getSingle,
    patch,
    drop
}