/* call package */
const express = require('express');



/* call package function */
const signinRouter = express.Router();



/* Call another files */
const { userSignin , userLogin , userLogout , userDataFront } = require('../controllers/user.controller');
const { uploadExcel , noUploadExcel } = require('../middlewares/fileUpload.middleware');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');



/* Call another files functions and original functions */
signinRouter.route('/signin').post(noUploadExcel , userSignin);
signinRouter.route('/login').post(noUploadExcel , userLogin);

signinRouter.route('/logout').get(userLogout);


signinRouter.route('/getuserfront').get(userDataFront);


/* export functions */
module.exports = {
    signinRouter
}