const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileShema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required'],
        min: [3,'Name must be at least 3 characters long'],
        max:[50, 'Name can not exceed 50 characters']
    },
    age:{
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be postive number'],
        max:[120, 'Age must be realistic']
    },
    gender:{
        type:String,
        required: [true, 'Gender is required'],
        enum: {
            values:['Male', 'Female', 'other'],
            message: 'Gender must be male female or other'
        }     
    },
    ethnicity:{
       type: String,
       required: [true, 'Ethnicity is required'],
       enum:{
          values: ['Asian', 'Black', 'Caucasian', 'Hispanic', 'Other'],
          message: 'Ethnicity must be one of the predefined values'
       }
    },
    email:{
        type: String,
        required: [true, 'Email is required'],
        minlength: [8, 'Email must be at least 8 characters long' ],
        maxlength: [100, 'Email con not exceed 100 characters'],
        Math: [/\S+@\S+\.\S+/, 'Email is not valid']
    },
    phone:{
        type:String,
        required: [true, 'Phone number is required'],
        match: [/^\+\d{1,4}\s\d{10}$/, 'Phone number must be in the format: +<country_code> <number>']
    }
},
    {timestamps: true,})

    const File = mongoose.model('File', fileShema); 
    module.exports = File;




