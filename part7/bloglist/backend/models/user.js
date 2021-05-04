const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema(
    {
        username:
        {
            type: String,
            required: true,
            minlength: 3,
            unique: true
        },
        password:
        {
            type: String,
            required: true
        },
        name: String,
        blogs: {
            type:[
            {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
            }
        ],
        default: []
    }

    }
);

userSchema.plugin(uniqueValidator, {type: "mongoose-unique-validator", message:"ValidationError"});

userSchema.set('toJSON', {
    transform: (document, returnedObject)=>{
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.password;
    }

})

const User = mongoose.model('User', userSchema);

module.exports = User;