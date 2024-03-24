import nodemailer from 'nodemailer'
export const ContactForm = async (req, resp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const { username, email, message } = req.body;
  const mailOptions = {
    from: {
      name: username,
      address: email,
    },
    to: ["awadheshgupta.official@gmail.com"],
    subject: "Tutor Contact",
    text: "kuchh bhi",
    html: `<p>${email} <br/>
    ${message} </p>`,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) return console.log(err);
    resp.status(200).send({ message: "Mail sent", message_id: info.messageId });
  });
};
