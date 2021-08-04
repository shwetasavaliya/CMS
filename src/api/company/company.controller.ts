
import { Body, JsonController, Post, Put, Req, Res } from "routing-controllers";
import CompanyService from "./company.service";
import { CompanyDTO, CompanyUpadteDTO } from "./company.validator";

@JsonController("/company")
export default class CompanyController {
  private companyService: CompanyService = new CompanyService();

  @Post("/companydetails", { transformResponse: true })
  async company(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: CompanyDTO
  ) {
    try {
      const { name, address, mobile, email, gstNo, panNo } = body;
      const companyDetails: any = {
        name,
        address,
        mobile,
        email,
        gstNo,
        panNo,
      };

      const companyData = await this.companyService.create(companyDetails);

      return response.formatter.ok(
        companyData,
        true,
        "COMPANY_REGISTER_SUCCESS"
      );
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error(
        {},
        false,
        "COMPANY_REGISTER_FAILED",
        error
      );
    }
  }
  @Put("/companyupdate/:id")
  async companyupdate(
    @Req() request: any,
    @Res() response: any,
    @Body({ validate: true }) body: CompanyUpadteDTO
  ) {
    try {
      const { companyName, companyAddress, companyMobile, companyEmail, companyGstNo, companyPanNo } = body;
      const _id = request.params.id;
      const update: any = {
        $set: {},
      };
      if (companyName) update.$set.companyName = companyName;
      if (companyAddress) update.$set.companyAddress = companyAddress;
      if (companyMobile) update.$set.companyMobile = companyMobile;
      if (companyEmail) update.$set.companyEmail = companyEmail;
      if (companyGstNo) update.$set.companyGstNo = companyGstNo;
      if (companyPanNo) update.$set.companyPanNo = companyPanNo;

      const newCompanyData = await this.companyService.update({ _id }, update);
      return response.formatter.ok(
        newCompanyData,
        true,
        "COMPANY_UPDATE_SUCCESS"
      );
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error(
        {},
        false,
        "COMPANY_UPDATE_FAILED",
        error
      );
    }
  }
}
