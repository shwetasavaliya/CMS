import {
    Body,
    Get,
    JsonController,
    Post,
    Delete,
    Req,
    Res,
    UseBefore,
  } from "routing-controllers";
  import LanguageMasterService from "./languageMaster.service";
  import { LanguageDTO,UpdateLanguageDTO } from "./languageMaster.validation";
  import { Auth } from "../../middleware/auth";
  
  @JsonController("/languageMaster")
  @UseBefore(Auth)
  export default class LanguageMasterController {
    private languageMasterService: LanguageMasterService = new LanguageMasterService();
  
    @Post("/create", { transformResponse: true })
    async addLanguage(
      @Req() request: any,
      @Res() response: any,
      @Body({ validate: true }) body: LanguageDTO
    ) {
        try{
          const { isFrontEnd,isBackEnd,language } = body;
          const languageExist = await this.languageMasterService.findOne({language});
          if(isFrontEnd === true)
          if(languageExist){
            return response.formatter.error({}, false, "LANGUAGE_ALREADY_EXISTS");
          }
          const languageData:any = { 
            isFrontEnd,
            isBackEnd,
            language,
            createdBy:request.data.id,
        };
        const languageCreate = await this.languageMasterService.create(languageData)
        return  response.formatter.ok(
          { languageCreate },
          true,
          "LANGUAGE_ADD_SUCCESS"
        );
      }
       catch (error) {
        console.log("ERR:: ", error);
        return response.formatter.error({}, false, "LANGUAGE_ADD_FAILED", error);
      }
    }

    @Get("/get")
    async getLanguage(@Req() request: any, @Res() response: any) {
      try {
        const { isFrontEnd,isBackEnd } = request.query;
        const data:any = {};
        if(isFrontEnd == 'true')
        data.isFrontEnd = true
        if(isBackEnd == 'true')
        data.isBackEnd = true
        const getLanguage = await this.languageMasterService.find(data);
        return  response.formatter.ok(
          { getLanguage },
          true,
          "LANGUAGE_DISPLAY_SUCCESS"
        );
      } catch (error) {
        console.log("ERR:: ", error);
        return response.formatter.error({}, false, "LANGUAGE_DISPLAY_FAILED", error);
      }
    }
    

    @Delete("/delete/:id", { transformResponse: true })
    async deleteLanguage(
      @Req() request: any,
      @Res() response: any
    ){
    try {
      const id = request.params.id;
      await this.languageMasterService.delete(id);
      return  response.formatter.ok(
        { },
        true,
        "LANGUAGE_DELETE_SUCCESS"
      );
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "LANGUAGE_DELETE_FAILED", error);
    }
  }

  @Post("/update/:id",{ transformResponse: true })
  async updateLanguage(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: UpdateLanguageDTO
  ){
    try {
      const { isFrontEnd,isBackEnd,language } = body;
      const id = request.params.id;
      const update :any = {};
      if(typeof isFrontEnd === 'boolean') update.isFrontEnd = isFrontEnd;
      if(typeof isBackEnd === 'boolean') update.isBackEnd = isBackEnd;
      if(language) update.language = language;
      update.updatedBy = request.data.id;
      await this.languageMasterService.update({_id:id},{$set:update})
      return  response.formatter.ok(
        { },
        true,
        "LANGUAGE_UPDATE_SUCCESS"
      );
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "LANGUAGE_UPDATE_FAILED", error);
    }
  }
  }
  