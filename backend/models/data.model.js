
/* call package */
const mongoose = require('mongoose');



/* call package function */
const dataStructure = new mongoose.Schema({
    FirstName : {
        type : String,
        required : true
    },
    LastName : {
        type : String,
        required : true
    },
    Role : {
        type : String,
        required : true
    },
    DOB : {
        type: Date,
        required: [true, 'Date of Birth is required'],
        validate: {
            validator: function (value) {
              console.log('Validating DOB:', value);
              const today = new Date();
              return value <= today;
            },
            message: 'Date of Birth must be in the past',
        },
    },
    Gender : {
        type : String,
        required : true
    },
    Email : {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Ensures no duplicate emails
        match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address',
        ],
    },
    Mobile : {
        type : Number,
        required : true
    },
    City : {
        type : String,
        required : true
    },
    State : {
        type : String,
        required : true
    },
});


const dataTable = mongoose.model('data' , dataStructure);



/* export functions */
module.exports = {
    dataTable
}
