/* call package */
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const path = require('path');



/* call package function */
dotEnv.config({
    path : path.join(__dirname , '.env')
});



/* Call another files */



/* Call another files functions and original functions */
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URL).then((connect) => {
        console.log(`Database is connected in ${connect.connection.host}`);
    }).catch((error) => {
        console.log(error.message);
    })
};



/* export functions */
module.exports = {
    connectDatabase
}