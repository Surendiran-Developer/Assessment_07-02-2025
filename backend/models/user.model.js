
/* call package */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



/* call package function */
const userStructure = new mongoose.Schema({
    userEmail : {
        type : String,
        required : true,
        unique : true
    },
    userPassword : {
        type : String,
        required : true
    }
});



/* Call another files */



/* Call another files functions and original functions */
userStructure.pre('save' , async function(next){
    this.userPassword = await bcrypt.hash(this.userPassword , 10);
    next();
});


userStructure.methods.comparePassword = async function(userPassword){
    return await bcrypt.compare(userPassword , this.userPassword);
} 

const userTable = mongoose.model('user' , userStructure);



/* export functions */
module.exports = {
    userTable
}
