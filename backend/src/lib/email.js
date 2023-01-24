import nodemailer from "nodemailer";

let transporter;
async function main() {
  let testAccount = await nodemailer.createTestAccount();

  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.mail,
      pass: process.env.mailPassword,
    },
  });
}
await main().catch(console.error);

async function sendMail(from, to, subject, html) {
  try {
    const info = await transporter.sendMail({
      from: `<${from}>`,
      to: `<${to}>`,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    console.log('termino')

  } catch (error) {
    return "error";
  }
}

export {sendMail} 
