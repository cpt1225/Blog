import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com', // QQ 邮箱 SMTP 服务器地址
  port: 465, // 使用 SSL 连接
  secure: true,
  auth: {
    user: process.env.EMAIL_USER, // QQ邮箱地址
    pass: process.env.EMAIL_PASS, // 授权码（不是密码）
  },
});

export const sendOTPEmail = async (mail: string, otp: string) => {
  await transporter.sendMail({
    from: `"墨语笔迹" <${process.env.EMAIL_USER}>` ,
    to: mail,
    subject: '您的验证码',
    html: `<p>您的验证码是：<b>${otp}</b>。该验证码5分钟内有效。</p>`,
  });
};