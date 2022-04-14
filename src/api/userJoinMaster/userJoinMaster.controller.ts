import {
  Body,
  Get,
  JsonController,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
  Delete,
} from "routing-controllers";
import UserJoinService from "./userJoinMaster.service";
import { joinUserDTO } from "./userJoinMaster.validation";

@JsonController("/joinUserMaster")
export default class ProjectController {
  private userJoinService: UserJoinService = new UserJoinService();
  @Post("/create", { transformResponse: true })
  async joinUserCreate(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: joinUserDTO
  ) {
    try {
      const { firstname, lastname, email, password } = body;

      const newJoinUser: any = {
        firstname,
        lastname,
        email,
        password,
      };
      const data = await this.userJoinService.create(newJoinUser);
      return response.formatter.ok({ data }, true, "JOIN_USER_ADD_SUCCESS");
    } catch (error) {}
  }
}
