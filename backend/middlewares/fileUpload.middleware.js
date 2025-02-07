/* call package */
const multer = require('multer');
const path = require('path');
const fs = require('fs');



/* call package function */
const storage = multer.diskStorage({
    destination : (req , file , cb) => {

        
        if (file.fieldname === 'excel') {
            const imageUploadPath = path.join(__dirname , '..' , 'assets' , 'uploads' , 'excel');
            if(!fs.existsSync(imageUploadPath)){
                fs.mkdirSync(imageUploadPath , { recursive : true });
            }
            cb(null, imageUploadPath);
        }
         else {
            cb(new Error('Invalid file type'), false);
        }

    },
    filename : (req , file , cb) => {

        cb(null , `${Date.now()}-${file.originalname}`);

    }
});

const filefilter = (req , file , cb) => {

    const allowedExcelTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel' ];

    if (file.fieldname === 'excel' && allowedExcelTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error('Invalid File Format.'));
    }
};

const uploads = multer({
    storage : storage,
    fileFilter : filefilter,
    limits : {
        fieldSize : 5 * 1024 * 1024
    }
});

const uploadExcel = uploads.fields([
    {
        name : 'excel',
        maxCount : 1
    }

]);

const noUploadExcel = uploads.none();




/* Call another files */



/* Call another files functions and original functions */



/* export functions */
module.exports = {
    uploadExcel,
    noUploadExcel
}