import { Body, Get, JsonController, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import UserService from "./user.service";
import { ChangePasswordDTO, ChechEmailDTO, ForgotPasswordDTO, LoginDTO, UpdateDTO, UserDTO } from "./user.validator";
import console from "console";
import { Auth } from "../../middleware/auth";
import CompanyService from "../company/company.service";
import { compareBcryptPassword, hashPassword, jwtTokenGenerate, otpGenerate, sendEmail } from "../../utils/comman/comman.utils";
import { checkBlank } from "./user.utils";
import crypto from "crypto";
import passport from "passport";
import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../config";
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, undefined);
})
passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${BASE_URL}/api/v1/user/loginwithgoogle/callback`,
  passReqToCallback: true
},

  (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    return done(undefined, profile)
  }
))

@JsonController("/user")
export default class UserController {
  private userService: UserService = new UserService();
  private companyService: CompanyService = new CompanyService();

  @Post("/register", { transformResponse: true })
  async register(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: UserDTO) {
    try {
      const {
        email,
        password,
        firstName,
        middleName,
        lastName,
        userName,
        phone,
        city,
        state,
        country,
        companyName,
        companyAddress,
        companyMobile,
        companyEmail,
        companyGstNo,
        companyPanNo,
      } = body;

      const userExists = await this.userService.findOne({ email });
      if (userExists)
        return response.formatter.error({}, false, "USER_ALREADY_EXISTS");

      const hashedPassword = await hashPassword(password);

      const userData: any = {
        email,
        password: hashedPassword,
        firstName,
        middleName,
        lastName,
        userName,
        phone,
        city,
        state,
        country,
      };

      const companyDetails: any = {
        companyName,
        companyAddress,
        companyMobile,
        companyEmail,
        companyGstNo,
        companyPanNo,
      };

      const companyData = await this.companyService.create(companyDetails);
      if (!companyData)
        return response.formatter.error({}, false, "COMPANY_REGISTRATION_FAILED");
      userData.companyId = companyData._id;
      const userCreate = await this.userService.create(userData);
      const id = userCreate._id;

      const token = jwtTokenGenerate({
        id,
        firstName,
        lastName,
        email,
        phone,
      });

      return response.formatter.ok({ ...userData, companyData, token }, true, "USER_REGISTER_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "USER_REGISTER_FAILED", error);
    }
  }

  @Post("/login")
  async login(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: LoginDTO) {
    try {

      const { userName, email, password } = body;
      let query: any = {};
      if (email) query = { email };
      if (userName) query = { userName };
      const user: any = await this.userService.findOne(
        query,
        {},
        {
          _id: 1,
          userName: 1,
          email: 1,
          password: 1,
          firstName: 1,
          lastName: 1,
          phone: 1,
        }
      );

      if (!user)
        return response.formatter.error({}, false, "USER_NOT_EXISTS");

      const isMatch = await compareBcryptPassword(password, user.password);
      if (!isMatch)
        return response.formatter.error({}, false, "INVALID_LOGIN_DETAILS");

      const token = jwtTokenGenerate({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      });
      delete user.password;

      return response.formatter.ok({ ...user, token }, true, "USER_LOGIN_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "USER_LOGIN_FAILED", error);
    }
  }

  @Put("/update")
  @UseBefore(Auth)
  async updateProfile(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: UpdateDTO
  ) {
    try {
      const { id } = request?.data || { id: "" };
      const { firstName, middleName, lastName, userName, fileName } = body;
      const update: any = {
        $set: {},
      };

      const isBlank = checkBlank([
        firstName,
        middleName,
        lastName,
        userName,
        fileName,
      ]);
      if (isBlank)
        return response.formatter.error({ isBlank }, false, "USER_DATA_IS_NOT_FOUND")

      if (firstName) update.$set.firstName = firstName;
      if (middleName) update.$set.middleName = middleName;
      if (lastName) update.$set.lastName = lastName;
      if (userName) update.$set.userName = userName;
      if (fileName)
        update.$set.profilePictures = {
          orignal: fileName,
          thumb: fileName,
        };

      const newUserData = await this.userService.update({ _id: id }, update);
      if (!newUserData)
        return response.formatter.error({ newUserData }, false, "USER_NOT_EXISTS");

      return response.formatter.ok({ newUserData }, true, "USER_UPDATE_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "USER_UPDATE_FAILED", error);
    }
  }

  @Post("/check-user-email")
  async checkEmail(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: ChechEmailDTO) {
    try {
      const { email } = body;
      const user = await this.userService.findOne({ email });
      if (!user) return response.formatter.error({}, false, "ENTER_VALID_EMAIL");

      const otp = otpGenerate();
      const otpUpdate = await this.userService.updateOne(
        { email },
        { $set: { otp } },
        { new: true }
      );
      if (!otpUpdate) return response.formatter.error({}, false, "OTP_IS_NOT_UPDATE")
      const resetPasswordToken = await crypto.randomBytes(24).toString("hex")

      const updateToken = await this.userService.updateOne({ email }, { $set: { resetPasswordToken } }, { new: true })
      if (!updateToken) return response.formatter.error({}, false, "LINK_GENERATE_FAILED")

      // const firstName = user.firstName
      const sendemail = await sendEmail(user.firstName, email, resetPasswordToken);
      if (!sendemail) return response.formatter.error({}, false, "EMAIL_SEND_FAILED")

      return response.formatter.ok({}, true, "EMAIL_SEND_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "EMAIL_CHECK_FAILED", error);
    }
  }

  // @Post("/verifyotp")
  // async verifyOtp(
  //   @Req() request: any,
  //   @Res() response: any,
  //   @Body({ validate: true }) body: OtpDTO
  // ) {
  //   try {
  //     const { email } = body;
  //     const user = await this.userService.findOne({ email });
  //     if (!user)
  //       return response.formatter.error({}, false, "ENTER_VALID_EMAIL");
  //     if (user.otp != request.body.otp)
  //       return response.formatter.error({}, false, "OTP_IS_NOT_MATCH");

  //     const updateOtp = await this.userService.updateOne(
  //       { email },
  //       { $unset: { otp: '' } },
  //       { new: true }
  //     );
  //     return response.formatter.ok({ updateOtp }, true, "OTP_VERIFICATION_SUCCESS");
  //   } catch (error) {
  //     console.log("ERR:: ", error);
  //     return response.formatter.error({}, false, "OTP_VERIFICATION_FAILED", error);
  //   }
  // }


  @Post("/forgot-password/:token")
  async forgotPassword(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: ForgotPasswordDTO) {
    try {
      const { email, password } = body;
      const resetPasswordToken = request.params.token

      const user = await this.userService.findOne({ email });
      if (!user) return response.formatter.error({}, false, "ENTER_VALID_EMAIL");

      if (user.resetPasswordToken != resetPasswordToken) return response.formatter.error({}, false, "INVALID_TOKEN")

      const hashedPassword = await hashPassword(password);
      const updatePassword = await this.userService.updateOne(
        { email },
        { $set: { password: hashedPassword }, $unset: { resetPasswordToken } },
        { new: true }
      );
      if (!updatePassword) return response.formatter.error({}, false, "PASSWORD_UPDATE_FAILED")

      return response.formatter.ok({}, true, "FORGOT_PASSWORD_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "FORGOT_PASSWORD_FAILED", error);
    }
  }

  @Put("/change-password")
  @UseBefore(Auth)
  async changePassword(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: ChangePasswordDTO) {
    try {
      const { id } = request?.data || { id: "" };
      const { oldPassword, newPassword } = body
      const user: any = await this.userService.findOne({ _id: id })
      if (!user) return response.formatter.error({}, false, "USER_NOT_EXISTS");

      const isMatch = await compareBcryptPassword(oldPassword, user.password);
      if (!isMatch) return response.formatter.error({}, false, "PASSWORD_NOT_MATCH")

      const hashedPassword = await hashPassword(newPassword)
      const changePassword = await this.userService.updateOne({ _id: id }, { $set: { password: hashedPassword } }, { new: true })

      if (!changePassword) return response.formatter.error({}, false, "USER_NOT_EXISTS")
      delete user.password;

      return response.formatter.ok({ user }, true, "CHANGE_PASSWORD_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "CHANGE_PASSWORD_FAILED", error)
    }
  }

  @Get("/loginwithgoogle")
  loginGoogle(@Req() request: any, @Res() response: any) {
    passport.authenticate("google", { scope: ["profile", "email"], session: false })(request, response)
  }

  @Get("/loginwithgoogle/callback")
  @UseBefore(passport.authenticate("google", {
    failureRedirect: `${BASE_URL}/api/v1/user/loginwithgoogle`
  }))
  async loginGoogleCallback(@Req() request: any, @Res() response: any) {
    try {
      const { user } = request
      const user_email = user.emails[0].value;

      const userExists = await this.userService.findOne({ email: user_email })
      const userExistsToken = await jwtTokenGenerate({ _id: userExists?._id, firstName: userExists?.firstName, email: userExists?.email })
      if (userExists) return response.formatter.ok({ userExists, userExistsToken }, true, "USER_LOGIN_SUCCESS");

      const userName = user.displayName
      const firstName = user.name.givenName
      const lastName = user.name.familyName

      const data: any = {
        email: user_email,
        firstName,
        lastName,
        userName,
        is_email_verified: true
      }
      const newUserData = await this.userService.create(data)
      if (!newUserData) return response.formatter.error({}, false, "USER_LOGIN_FAILED");

      const newUserToken = await jwtTokenGenerate({ _id: newUserData._id, firstName, lastName, userName })

      return response.formatter.ok({ ...data, newUserToken }, true, "USER_LOGIN_SUCCESS")

    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "USER_LOGIN_FAILED", error);
    }
  }
}
