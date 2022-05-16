import {
  Body,
  Get,
  JsonController,
  Post,
  Req,
  Res,
  UseBefore,
  Delete,
} from "routing-controllers";

import RoleMasterService from "./roleMaster.service";
import UserProjectService from "../userProjectMaster/userProjectMaster.service"
import { roleDTO, roleUpdateDTO,getuserDTO,assignRole } from "./roleMaster.validation";
import { Auth } from "../../middleware/auth";
import Mongoose from "mongoose";

@JsonController("/roleMaster")
@UseBefore(Auth)
export default class RoleMasterController {
  private roleMasterService: RoleMasterService = new RoleMasterService();
  private userProjectService: UserProjectService = new UserProjectService();

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
      };0
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
      const role = await this.roleMasterService.find({createdBy:request.data.id});
      return response.formatter.ok({role}, true, "ROLE_DISPLAY_SUCCESS");
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

  @Post("/update/:id", { transformResponse: true })
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

  @Post("/getUser",{ transformResponse: true })
  async getUser( 
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: getuserDTO
  ){
    try {
      const { adminId } = body
      const user = [
        {
          '$match': {
            'adminId': Mongoose.Types.ObjectId(adminId) 
          }
        }, {
          '$lookup': {
            'from': 'registrations', 
            'localField': 'userId', 
            'foreignField': '_id', 
            'as': 'userId'
          }
        }, {
          '$unwind': {
            'path': '$userId', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$group': {
            '_id': '$userId._id', 
            'userName': {
              '$first': '$userId.userName'
            }
          }
        }
      ]
      const getUser = await this.userProjectService.aggregate(user);
      return response.formatter.ok({getUser}, true, "USER_GET_SUCCESS");
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error(
        {},
        false,
        "USER_GET_FAILED",
        error
      );
    }
  }

  @Post("/assign-role",{transformResponse: true})
  async assignRole(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: assignRole
  ){
    try {
      const { userId,projectId,roleId } = body;
      const roleData  = await this.userProjectService.updateOne({userId,projectId},{$set:{role:roleId} },{upsert:false,new:true});
      if(!roleData) return response.formatter.error({}, false, "USER_PROJECT_ID_NOT_FIND");
      return response.formatter.ok({roleData}, true, "ROLE_DATA_SET_SUCCESSFULLY");
    } catch (error) {
      console.log("ERR::", error);
      return response.formatter.error(
        {},
        false,
        "ROLE_DATA_FAILED",
        error
      );
    }
  }
}