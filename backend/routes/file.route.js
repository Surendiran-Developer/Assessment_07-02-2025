/* call package */
const express = require('express');



/* call package function */
const fileRouter = express.Router();



/* Call another files */
const { fileUpload, deleteInfo, updateInfo, readInfo , readData } = require('../controllers/file.controller');
const { uploadExcel , noUploadExcel } = require('../middlewares/fileUpload.middleware');
const { jwtAuthenticate } = require('../middlewares/jwtAuth.middleware');



/* Call another files functions and original functions */
fileRouter.route('/fileUpload').post(jwtAuthenticate, uploadExcel , fileUpload);
fileRouter.route('/fileRead').get(jwtAuthenticate, noUploadExcel , readInfo);
fileRouter.route('/fileUpdate/:id').post(jwtAuthenticate, noUploadExcel , updateInfo);
fileRouter.route('/fileDelete/:id').delete(jwtAuthenticate, noUploadExcel , deleteInfo);
fileRouter.route('/export').post(jwtAuthenticate, noUploadExcel , readData);



/* export functions */
module.exports = {
    fileRouter
}