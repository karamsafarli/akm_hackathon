const nodemailer = require('nodemailer')

const sendMail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        await transporter.sendMail({
            to,
            subject,
            html
        });
    } catch (error) {
        console.log(error);
    }
}

module.exports = { sendMail }