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

import RoleMasterService from "./roleMaster.service";
import { roleDTO, roleUpdateDTO } from "./roleMaster.validation";
import { Auth } from "../../middleware/auth";

@JsonController("/roleMaster")
@UseBefore(Auth)
export default class ProjectController {
  private roleMasterService: RoleMasterService = new RoleMasterService();

  @Post("/create", { transformResponse: true })
  async roleCreate(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: roleDTO
  ) {
    try {
      const { roleName, description } = body;

      const newRole: any = {
        roleName,
        description,
        createdBy: request.data.id,
      };
      const data = await this.roleMasterService.create(newRole);
      return response.formatter.ok({ data }, true, "ROLE_ADD_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "ROLE_ADD_FAILED", error);
    }
  }

  @Get("/get", { transformResponse: true })
  async getRole(@Req() request: any, @Res() response: any) {
    try {
      await this.roleMasterService.find({});
      return response.formatter.ok({}, true, "ROLE_DISPLAY_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "ROLE_DISPLAY_FAILED", error);
    }
  }

  @Delete("/delete/:id", { transformResponse: true })
  async deleteRole(@Req() request: any, @Res() response: any) {
    try {
      const id = request.params.id;
      await this.roleMasterService.delete(id);
      return response.formatter.ok({}, true, "ROLE_DELETE_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "ROLE_DELETE_FAILED", error);
    }
  }

  @Put("/update/:id", { transformResponse: true })
  async updateRole(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: roleUpdateDTO
  ) {
    try {
      const { roleName, description } = body;
      const id = request.params.id;
      const update: any = {};
      if (roleName) update.roleName = roleName;
      if (description) update.description = description;
      update.updatedBy = request.data.id;
      await this.roleMasterService.update({ _id: id }, { $set: update });
      return response.formatter.ok({}, true, "ROLE_UPDATE_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error(
        {},
        false,
        "PROJECT_UPDATE_FAILED",
        error
      );
    }
  }
}
