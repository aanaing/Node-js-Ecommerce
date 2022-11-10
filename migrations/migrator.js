const helper=require('../utils/msg');
const fs=require('fs'); // to read file fs=> file system
const userDB=require('../model/user');

const migrate = () =>{
    let data = fs.readFileSync('./migrations/user.json');
    let users=JSON.parse(data);

    users.forEach(async(user)=>{
        user.password=helper.encode(user.password);
        let result=await new userDB(user).save();
        console.log(result);
    })   
}

module.exports={
    migrate
}