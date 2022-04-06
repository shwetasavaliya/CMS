import {
  Body,
  Get,
  JsonController,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import UserService from "./user.service";
import {
  UserDTO,
  UserEmailDTO,
  OtpSendDTO,
  matchOtpDTO,
  resetPasswordDTO,
} from "./user.validator";
import { Auth } from "../../middleware/auth";
import {
  hashPassword,
  jwtTokenGenerate,
  comparePassword,
  OtpGenerate,
} from "../../utils/comman/comman.utils";
import { sendMail } from "../../utils/comman/mailSend";
import { get } from "http";
import { request } from "https";
import { response } from "express";

@JsonController("/user")
export default class UserController {
  private userService: UserService = new UserService();

  @Post("/create", { transformResponse: true })
  async register(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: UserDTO
  ) {
    try {
      const { userName, email, password, phoneNo } = body;
      const userExists = await this.userService.findOne({ email });

      if (userExists)
        return response.formatter.error({}, false, "USER_ALREADY_EXISTS");

      const hashedPassword = await hashPassword(password);
      const userData: any = {
        userName,
        email,
        password: hashedPassword,
        phoneNo,
      };
      const userCreate: any = await this.userService.create(userData);
      const id = userCreate._id;

      const token = jwtTokenGenerate({
        id,
        userName,
        email,
        phoneNo,
      });
      return response.formatter.ok(
        { ...userData, token },
        true,
        "USER_REGISTER_SUCCESS"
      );
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "USER_REGISTER_FAILED", error);
    }
  }

  @Post("/login")
  async login(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: UserEmailDTO
  ) {
    try {
      const { email, password } = body;
      const userEmail: any = await this.userService.findOne({ email });
      if (!userEmail)
        return response.formatter.error({}, false, "USER_EMAIL_IS_NOT_A_MATCH");
      const matchPassword = await comparePassword(password, userEmail.password);
      if (matchPassword == false)
        return response.formatter.error(
          {},
          false,
          "USER_PASSWORD_IS_NOT_A_MATCH"
        );
      const token = jwtTokenGenerate({
        id: userEmail._id,
        userName: userEmail.userName,
        email: userEmail.email,
        phoneNo: userEmail.phoneNo,
      });
      return response.formatter.ok(
        { ...userEmail, token },
        true,
        "USER_LOGIN_SUCCESS"
      );
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error({}, false, "USER_LOGIN_FAILED", error);
    }
  }

  @Get("/get")
  @UseBefore(Auth)
  async getUser(@Req() request: any, @Res() response: any) {
    try {
      const id = request.data.id;
      const userData = await this.userService.findOne({ _id: id });
      return response.formatter.ok({ userData }, true, "USER_GET_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "USER_GET_FAILED", error);
    }
  }

  @Post("/otpSend")
  async otpSend(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: OtpSendDTO
  ) {
    try {
      const { email } = body;
      const userEmail: any = await this.userService.findOne({ email });
      if (!userEmail)
        response.formatter.error({}, false, "USER_EMAIL_IS_NOT_A_MATCH");
      const otp = OtpGenerate();
      let otpGet = otp.toString().padStart(4, "0");
      await this.userService.update(
        { _id: userEmail._id },
        { $set: { OTP: otpGet } }
      );
      sendMail(userEmail.email, otpGet);
      return response.formatter.ok({}, true, "OTP_SEND_SUCCESS");
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error({}, false, "OTP_SEND_FAILED", error);
    }
  }

  @Post("/match-otp")
  async matchOtp(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: matchOtpDTO
  ) {
    try {
      const { email, otp } = body;
      const userEmail = await this.userService.findOne({ email, OTP: otp });
      if (!userEmail)
        return response.formatter.error({}, false, "OTP_DOES_NOT_MATCH");
      await this.userService.updateOne({ email }, { $set: { OTP: " " } });
      return response.formatter.ok({}, true, "OTP_MATCH_SUCCESS");
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error({}, false, "OTP_VERIFY_FAILED", error);
    }
  }

  @Post("/resetPassword")
  async resetPassword(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: resetPasswordDTO
  ) {
    try {
      const { email, password } = body;
      const hashedPassword = await hashPassword(password);
      await this.userService.updateOne(
        { email },
        { $set: { password: hashedPassword } }
      );
      return response.formatter.ok({}, true, "PASSWORD_RESET");
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error({}, false, "PASSWORD_NOT_RESET", error);
    }
  }
}
