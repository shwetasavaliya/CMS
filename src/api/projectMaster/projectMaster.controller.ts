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
import ProjectMasterService from "./projectMaster.service";
import {
  ProjectDTO
} from "./projectMaster.validator";
import { Auth } from "../../middleware/auth";


@JsonController("/projectMaster")
@UseBefore(Auth)
export default class ProjectController {
  private projectMasterService: ProjectMasterService = new ProjectMasterService();

  @Post("/create", { transformResponse: true })
  async projectCreate(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: ProjectDTO
  ){
    try {
      const {
        projectTitle,
        projectAbstract,
        technology,
        language,
        databaseName,
        deployment,
        currentStatus,
        startDate,
      } = body;

      const newProject: any = {
        projectTitle,
        projectAbstract,
        technology,
        language,
        databaseName,
        deployment,
        currentStatus,
        startDate,
        createdBy: request.data.id,
      };
      const Data = await this.projectMasterService.create(newProject);
      console.log(Data);
      return response.formatter.ok(
        { Data },
        true,
        "PROJECT_ADD_SUCCESSFULLY"
      );
    }
    catch(error){
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "PROJECT_ADD_FAILED", error);
    }
  }
  
}
