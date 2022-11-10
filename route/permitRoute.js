const route=require('express').Router();
const controller=require('../controller/permitCon');
const {permitSchema,IdSchema}=require('../utils/schema');
const {validateBody,validateParam}=require('../utils/validation');

route.post('/',validateBody(permitSchema.add), controller.add);
route.get('/',controller.all);

route.route('/:id')
.get(validateParam(IdSchema.id,"id"),controller.getSingle)
.patch(validateParam(IdSchema.id,"id"),controller.patch)
.delete(validateParam(IdSchema.id,"id"),controller.drop)
module.exports=route;