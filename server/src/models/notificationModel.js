const { models, model, Schema } = require("mongoose");
const User = require("./userModel");
const Post = require('./postModel')

const notificationSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        enum: ['post', 'comment', 'like'],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const Notification = models.Notification || model('Notification', notificationSchema);
module.exports = Notification;
