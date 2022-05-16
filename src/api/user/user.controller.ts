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
import UserProjectService from "../userProjectMaster/userProjectMaster.service";
import {
  UserDTO,
  UserEmailDTO,
  sendUserJoinDTO,
  OtpSendDTO,
  matchOtpDTO,
  resetPasswordDTO,
  getProjectDTO
} from "./user.validator";
import { Auth } from "../../middleware/auth";
import {
  hashPassword,
  jwtTokenGenerate,
  comparePassword,
  OtpGenerate,
} from "../../utils/comman/comman.utils";
import { sendMail,userJoinMailSend } from "../../utils/comman/mailSend";
import {v1 as uuidv1} from 'uuid';
import base64 from 'base-64';
import Mongoose from "mongoose";

@JsonController("/user")
export default class UserController {
  private userService: UserService = new UserService();
  private userProjectService: UserProjectService = new UserProjectService();

  @Post("/create", { transformResponse: true })
  async register(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: UserDTO
  ) {
    try {
      const { userName, email, password,phoneNo, token } = body;
      
      const userExists = await this.userService.findOne({ email });
      if (userExists)
        return response.formatter.error({}, false, "USER_ALREADY_EXISTS");
      const hashedPassword = await hashPassword(password);
     
      const userData: any = {
        userName,
        email,
        password: hashedPassword,
        phoneNo
      };
      
      if(token) {
        const splitData = token.split('|');
        const projectId = splitData[0].toString();
        var decodedProjectId = base64.decode(projectId);
        const data:any = await this.userService.findOne({token:splitData[2]});
        userData.role = "user",userData.adminId = data._id;
      }
      else{
        userData.role = "admin",userData.adminId = null;
      }
      const userCreate: any = await this.userService.create(userData);
      const id = userCreate._id;

      const jwtToken = jwtTokenGenerate({
        id,
        userName,
        email,
        role:userData.role,
        phoneNo,
      });

      if(token){
        const splitData = token.split('|');
        const projectId = splitData[1].toString();
        var decodedProjectId = base64.decode(projectId);
        const projectData:any = {
          projectId:decodedProjectId,
          adminId:userData.adminId,
          userId:id
        }
        await this.userProjectService.create(projectData);
      }
      return response.formatter.ok(
        { ...userData, jwtToken },
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
      const { email, password, token} = body;
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
      const jwtToken = jwtTokenGenerate({
        id: userEmail._id,
        userName: userEmail.userName,
        email: userEmail.email,
        role: userEmail.role,
        phoneNo: userEmail.phoneNo,
      });
      if(token){
        const splitData = token.split('|');
        const projectId = splitData[1].toString();
        var decodedProjectId = base64.decode(projectId);
        const data:any = await this.userService.findOne({token:splitData[2]});
        const projectData:any = {
          projectId:decodedProjectId,
          adminId:data._id,
          userId:userEmail._id
        }
        const userExist = await this.userProjectService.findOne({projectId:decodedProjectId,userId:userEmail._id})
        if(!userExist)
        await this.userProjectService.create(projectData);
      }    
      return response.formatter.ok(
        { ...userEmail, jwtToken },
        true,
        "USER_LOGIN_SUCCESS"
      );
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error({}, false, "USER_LOGIN_FAILED", error);
    }
  }

  @Post("/sendInviteUser", { transformResponse: true })
  async sendUserInvite(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: sendUserJoinDTO
  ) {
    try {
      const { email,adminId,projectId } = body;
      const encodedProjectId = base64.encode(projectId);
      const encodedEmail = base64.encode(email);
      var token = uuidv1();
      await this.userService.updateOne({_id:adminId,role:"admin"},{$set:{token}},{upsert:false});
      var token =`${encodedEmail}|${encodedProjectId}|` + token; 
      // console.log(token);
      userJoinMailSend(email,token);
      return response.formatter.ok({}, true, "INVITATION_SEND_SUCCESS");
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error(
        {},
        false,
        "INVITATION_SEND_FAILED",
        error
      );
    }
  }
  @Post("/getUserProject" , { transformResponse: true })
  async getProject(@Req() request: any, @Res() response: any,@Body({ validate: true }) body: getProjectDTO){
    try {
      const { userId } = body
      const project = [
        {
          '$match': {
            'userId':  Mongoose.Types.ObjectId(userId)
          }
        }, { 
          '$lookup': {
            'from': 'projectmasters', 
            'localField': 'projectId', 
            'foreignField': '_id', 
            'as': 'projectId'
          }
        }, {
          '$unwind': {
            'path': '$projectId', 
            'preserveNullAndEmptyArrays': true
          }
        }
      ]
      const getProject = await this.userProjectService.aggregate(project);
      return response.formatter.ok({getProject}, true, "PROJECT_GET_SUCCESS");
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error(
        {},
        false,
        "PROJECT_GET_FAILED",
        error
      );
    }
  }


  // @Post("/compareInviteEmail", { transformResponse: true })
  // async compareInviteEmail(
  //   @Req() request: any,
  //   @Res() response: any,
  //   @Body({ validate: true }) body: OtpSendDTO
  // ){
  //   try {
  //     const { email } = body;
  //     const data = await this.userService.findOne({email});
  //     console.log(data);
  //     if(!data){
  //       return response.formatter.error({email}, false, "USER_DOESN'T_EXIST");
  //     }
  //     return response.formatter.ok(
  //       { email },
  //       true,
  //       "USER_EXIST"
  //     );
  //   } catch (error) {
  //     return response.formatter.error({}, false, "USER_EXIST_FAILED", error);
  //   }
  // }

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
        { $set: { OTP: otpGet }}
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
      await this.userService.updateOne({ email }, { $set: { OTP: " " } },{upsert:false});
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
