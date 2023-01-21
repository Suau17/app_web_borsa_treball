import nodemailer from "nodemailer";

let sendMail;
async function main() {
  let testAccount = await nodemailer.createTestAccount();
  
  let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // use correct hostname
      port: 465,
      secure: true, 
      auth: {
        user: process.env.mail, // use process.env.mail and process.env.mailPassword
        pass: process.env.mailPassword,
      },
  });

sendMail = async function deleteEmpresaController(from, to, subject, html) {
  try {
    const info = await transporter.sendMail( {
        from: ` <${from}>`, // sender address
        to:` <${to}>`, // list of receivers
        subject, // Subject line
        html, // html body
      });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    return 'error '
  }
}


main().catch(console.error);
}
export {sendMail} 