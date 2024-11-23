const Notification = require("../models/notificationModel");

const getUserNotifications = async (req, res) => {
    try {
        const start = req.query.start || 0;
        const count = req.query.count || 10;
        const userId = req.user.id;
        const notificationCount = await Notification.countDocuments({ userId });
        const notifications = await Notification.find({ userId })
            .skip(start)
            .limit(count)
            .populate('from', 'name surname email rtc roles profileImg')
            .populate('post')
            .sort({ createdAt: -1 });

        return res.status(200).json({ notifications, count: notificationCount });

    } catch (error) {
        return res.status(500).json({ error: 'Error occured while fetching notifications!' })
    }
}

const changeNotificationStatus = async (req, res) => {
    try {
        const { notificationId } = req.body;
        const userId = req.user.id;

        await Notification.findOneAndUpdate({ _id: notificationId, userId }, { isRead: true });

        return res.status(201).json({ message: 'Notification status changed successfully!' });
    } catch (error) {
        return res.status(500).json({ error: 'Error occured while changing notification status!' });
    }
}

module.exports = { getUserNotifications, changeNotificationStatus }