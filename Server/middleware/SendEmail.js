import nodemailer from 'nodemailer'

export const nodemailer = async(email, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: process.env.PORT,
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
    })

    await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject,
        text: text
    });

    console.log("Email sent Successfully");
    } catch (error) {
        console.log("Email not Sent");
        console.log(error)
    }
}