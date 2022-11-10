const DB=require('../model/role')
const PerDB=require('../model/permit')
const helper=require('../utils/msg')

const add=async(req,res,next)=>{
    let roleName=await DB.findOne({name:req.body.name});
    if(roleName) next(new Error("Role name is already in use"))
    else {
        let result=await (await new DB(req.body).save());
        helper.fMsg(res,"Added role data",result);
    }
}

const all=async(req,res,next)=>{
    let result=await DB.find().populate('permits','-__v');
    helper.fMsg(res,"Get all role data",result);
}

const singleRole=async(req,res,next)=>{
    let singleData=await DB.findById(req.params.id).select('-__v');
    if(singleData) helper.fMsg(res,"Get single role data",singleData)
    else next(new Error("Can't find by id"));
}

const patch=async(req,res,next)=>{
    let patchData=await DB.findById(req.params.id);
    if(patchData){
        await DB.findByIdAndUpdate(patchData._id,req.body);
        let result=await DB.findById(patchData._id).select('-__v');
        helper.fMsg(res,'Updated Role data',result);
    }else next (new Error("Can't find by id"));
}

const drop=async(req,res,next)=>{
    let dropData=await DB.findById(req.params.id);
    if(dropData){
        await DB.findByIdAndDelete(dropData._id).select('-__v');
        let result=await DB.findById(dropData._id);
        helper.fMsg(res,"Deleted role id",result);
    }else next(new Error("Can't find by id"));
}

const roleAddPermit=async(req,res,next)=>{
    let roleData=await DB.findById(req.body.roleId);
    let permitData=await PerDB.findById(req.body.permitId);
    if(roleData && permitData) {
        await DB.findByIdAndUpdate(roleData._id,{$push:{permits:permitData._id}});
        let result= await DB.findById(roleData._id);
        helper.fMsg(res,"Add permit data into role",result);
    }else next(new Error("Can't find by id"));
}

const removePermit=async(req, res, next)=>{
    let roleData=await DB.findById(req.body.roleId);
    console.log(roleData);
    let permitData=await PerDB.findById(req.body.permitId);
    console.log(permitData);
    if(roleData && permitData){
        await DB.findByIdAndUpdate(roleData._id,{$pull:{permits:permitData._id}});
        let result= await DB.findById(roleData._id);
        helper.fMsg(res,"Remove permit data from role",result);
    }else next (new Error("Can't find by id"));
}

module.exports={
    add,
    all,
    singleRole,
    patch,
    drop,
    roleAddPermit,
    removePermit
}