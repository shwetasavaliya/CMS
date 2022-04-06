import nodeMailer from "nodemailer";

export const sendMail = (email: String, otp: String) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "julleegorasiya.realloc@gmail.com",
      pass: "cpigqyphvfbzatws",
    },
  });

  const mailOptions: any = {
    from: "julleegorasiya.realloc@gmail.com",
    to: email,
    subject: "Send OTP",
    text: `OTP: ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent");
    }
  });
};
