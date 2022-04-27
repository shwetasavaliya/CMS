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
import Mongoose from "mongoose";
import ProjectMasterService from "./projectMaster.service";
import { ProjectDTO, UpdateProjectDTO } from "./projectMaster.validator";
import { Auth } from "../../middleware/auth";

@JsonController("/projectMaster")
@UseBefore(Auth)
export default class ProjectController {
  private projectMasterService: ProjectMasterService =
    new ProjectMasterService();

  @Post("/create", { transformResponse: true })
  async projectCreate(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: ProjectDTO
  ) {
    try {
      const {
        projectTitle,
        projectAbstract,
        isFrontEnd,
        isBackEnd,
        frontLanguageId,
        backLanguageId,
        databaseName,
        deployment,
        currentStatus,
        startDate,
      } = body;

      const newProject: any = {
        projectTitle,
        projectAbstract,
        isFrontEnd,
        isBackEnd,
        frontLanguageId,
        backLanguageId,
        databaseName,
        deployment,
        currentStatus,
        startDate,
        createdBy: request.data.id,
      };
      const data = await this.projectMasterService.create(newProject);
      return response.formatter.ok({ data }, true, "PROJECT_ADD_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "PROJECT_ADD_FAILED", error);
    }
  }

  @Get("/get", { transformResponse: true })
  async getProject(@Req() request: any, @Res() response: any) {
    try {
      const { id } = request.query;
      const data: any = {};
      if (id) {
        data._id = Mongoose.Types.ObjectId(id);
      }
      
      data.createdBy = Mongoose.Types.ObjectId(request.data.id);
      const frontEnd = [
        {
          $match: data,
        },
        {
          $lookup: {
            from: "languagemasters",
            localField: "frontLanguageId",
            foreignField: "_id",
            as: "frontLanguageId",
          },
        },
        {
          $lookup: {
            from: "languagemasters",
            localField: "backLanguageId",
            foreignField: "_id",
            as: "backLanguageId",
          },
        },
      ];
      const getProject = await this.projectMasterService.aggregate(frontEnd);
      return response.formatter.ok(
        { getProject },
        true,
        "PROJECT_DISPLAY_SUCCESS"
      );
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error(
        {},
        false,
        "PROJECT_DISPLAY_FAILED",
        error
      );
    }
  }

  @Delete("/delete/:id", { transformResponse: true })
  async deleteProject(@Req() request: any, @Res() response: any) {
    try {
      const id = request.params.id;
      await this.projectMasterService.delete(id);
      return response.formatter.ok({}, true, "PROJECT_DELETE_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error(
        {},
        false,
        "PROJECT_DELETE_FAILED",
        error
      );
    }
  }

  @Post("/update/:id", { transformResponse: true })
  async updateProject(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: UpdateProjectDTO
  ) {
    try {
      const {
        projectTitle,
        projectAbstract,
        isFrontEnd,
        isBackEnd,
        frontLanguageId,
        backLanguageId,
        databaseName,
        deployment,
        currentStatus,
        startDate,
      } = body;

      const id = request.params.id;
      const update: any = {};

      if (projectTitle) update.projectTitle = projectTitle;
      if (projectAbstract) update.projectAbstract = projectAbstract;
      if (typeof isFrontEnd === "boolean") update.isFrontEnd = isFrontEnd;
      if (typeof isBackEnd === "boolean") update.isBackEnd = isBackEnd;
      if (frontLanguageId) update.frontLanguageId = frontLanguageId;
      if (backLanguageId) update.backLanguageId = backLanguageId;
      if (frontLanguageId === null) update.frontLanguageId = frontLanguageId;
      if (backLanguageId === null) update.backLanguageId = backLanguageId;
      if (databaseName) update.databaseName = databaseName;
      if (deployment) update.deployment = deployment;
      if (typeof currentStatus === "boolean")
        update.currentStatus = currentStatus;
      if (startDate) update.startDate = startDate;
      update.updatedBy = request.data.id;
      const data = await this.projectMasterService.update(
        { _id: id },
        { $set: update }
      );
      return response.formatter.ok(data, true, "PROJECT_UPDATE_SUCCESS");
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
