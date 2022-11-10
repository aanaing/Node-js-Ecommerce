const route=require('express').Router();
const controller=require('../controller/roleCon');
const {permitSchema,IdSchema,roleSchema}=require('../utils/schema');
const {validateBody,validateParam}=require('../utils/validation');

route.post('/',validateBody(permitSchema.add),controller.add);
route.get('/',controller.all);
route.route('/:id')
.get(validateParam(IdSchema.id,"id"),controller.singleRole)
.patch(validateParam(IdSchema.id,'id'),controller.patch)
.delete(validateParam(IdSchema.id,'id'),controller.drop)

route.post('/add/permit',validateBody(roleSchema.addPermit),controller.roleAddPermit);
route.post('/remove/permit',validateBody(roleSchema.addPermit),controller.removePermit);
module.exports=route;
