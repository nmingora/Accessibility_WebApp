const mongoose = require("mongoose");


const refreshTokenSchema = new mongoose.Schema({
    refreshToken:{
        type:String,
        required:true,
    }
});

const RefreshToken = mongoose.model("RefreshToken",refreshTokenSchema);

module.exports = RefreshToken;