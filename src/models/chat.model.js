const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const chatSchema = new Schema({
    user: {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            default: 'https://i.ibb.co/ctVn6x8/default-avatar.png' , 
        },
    },
    message: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        default: Date.now
    },
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;