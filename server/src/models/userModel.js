const { Schema, model, models } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    about: {
        type: String,
        default: ''
    },
    profileImg: {
        type: String,
        default: ''
    },
    profileViewers: {
        type: Number,
        default: 0
    },
    carbonEmission: {
        type: String,
        default: ''
    },
    type: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { timestamps: true });

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    return user;
};

const User = models.User || model("User", userSchema)

module.exports = User