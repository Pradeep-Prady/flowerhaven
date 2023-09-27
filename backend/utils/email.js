const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  const transport = {
    service: "gmail",
    auth: {
      user: "pradeepprady005@gmail.com",
      pass: "holakskjnqgxjzqe",
    },
  };

  const transporter = nodemailer.createTransport(transport);

  const message = {
    from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
      </head>
      <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
  
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
          <tr>
            <td align="center" bgcolor="#292f3f" style="padding: 40px 0;">
              <h1 style="color: #ffffff;">Reset Your Password</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px;">
              <p>Dear ${options.name},</p>
              <p>We received a request to reset your password for your Flower Haven account. If you did not initiate this request, please ignore this email.</p>
              <p>To reset your password, click the link below or copy and paste it into your browser's address bar:</p>
              <p><a href="${options.url}" style="color: #007bff;">Reset Password</a></p>
              <p>Please note that this link is valid for a limited time. If you do not reset your password within 30 Minutes, you will need to initiate the process again.</p>
              <p>Thank you,<br>The Flower Haven Team</p>
            </td>
          </tr>
        </table>
  
      </body>
      </html>
    `,
  };

  await transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log("error", err);
    }
  });
};

module.exports = sendEmail;
