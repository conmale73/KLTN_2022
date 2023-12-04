const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const hobbySchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },  
});

const Hobby = mongoose.model("Hobby", hobbySchema);

module.exports = Hobby;
