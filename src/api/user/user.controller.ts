import { Body, Get, JsonController, Post, Put, Req, Res, UseBefore } from "routing-controllers";
import UserService from "./user.service";
import { UserDTO } from "./user.validator";
import { Auth } from "../../middleware/auth";
import { hashPassword, jwtTokenGenerate } from "../../utils/comman/comman.utils";

@JsonController("/user")
export default class UserController {
  private userService: UserService = new UserService();

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
      const userCreate: any = await this.userService.create(userData);
      const id = userCreate._id;

      const token = jwtTokenGenerate({
        id,
        firstName,
        lastName,
        email,
        phone,
      });

      return response.formatter.ok({ ...userData, token }, true, "USER_REGISTER_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "USER_REGISTER_FAILED", error);
    }
  }

 
}
