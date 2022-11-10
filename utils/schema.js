const joi=require('joi');
module.exports={
    permitSchema:{
        add:joi.object({
            name:joi.string().required()
        })
    },
    IdSchema:{
        id:joi.object({
            id:joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
    },
    roleSchema:{
        addPermit:joi.object({
            roleId:joi.string().regex(/^[0-9a-fA-F]{24}$/),
            permitId:joi.string().regex(/^[0-9a-fA-F]{24}$/)
        })
        
    }

}
