import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import { SECRET_KEY, USEREMAIL, PASSWORD } from "../../config";
import { authenticator } from "otplib"
import nodemailer from "nodemailer";

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
}

export const jwtTokenGenerate = (data: object) => {
  return jwt.sign(data, SECRET_KEY);
}

export const otpGenerate = () => {
  return authenticator.generate(SECRET_KEY)
}

export const sendEmail = (firstName: any, email: string, resetPasswordToken: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USEREMAIL,
      pass: PASSWORD
    }
  });

  const mailOpations = {
    from: `gangani  <${USEREMAIL}>`,
    to: email,
    subject: "about verify your mail",
    html: `<h1> hello ${firstName}<a href = "http://localhost:3100/resetPassword/${resetPasswordToken}"> Click Here </a> For Reset Password</h1>`,
  };
  return transporter.sendMail(mailOpations);
}

export const compareBcryptPassword = (password: string, cpassword: string) => {
  return bcrypt.compare(password, cpassword);
}
