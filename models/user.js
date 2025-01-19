const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    socialHandle: {
        type: String, 
        required: true
    },
    images:[ {
        type: String, 
        required:true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model("User", UserSchema)