const User = require("../../models/userModel");
const Notification = require('../../models/notificationModel');

const notifyAll = async (from, post) => {
    try {
        const user = await User.findById(from);
        if (!user) throw new Error('User not found!');

        const fullName = `${user.name} ${user.surname}`;

        const users = await User.find({ _id: { $ne: from } });

        const notifications = users.map(usr => ({
            userId: usr._id,
            type: 'post',
            title: `${fullName} shared new post`,
            from,
            post,
            isRead: false
        }));

        await Notification.insertMany(notifications);

    } catch (error) {
        throw new Error('Error occurred while sending notifications!');
    }
};



const notifyOne = async (from, to, type, post) => {
    try {
        const user = await User.findById(from);
        if (!user) throw new Error('User not found!');

        const fullName = `${user.name} ${user.surname}`;
        const title = type === 'comment' ? `${fullName} added comment on your post` : `${fullName} liked your post`;

        await Notification.create({ userId: to, type, title, from, post });
    } catch (error) {
        throw new Error('Error occured while sending notifications!');
    }
}


module.exports = { notifyAll, notifyOne }