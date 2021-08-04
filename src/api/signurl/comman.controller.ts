import { Body, JsonController, Post, Put, Req, Res } from "routing-controllers";
import { awsSigneUrl } from "../../utils/aws/signurl.utils";

@JsonController("/comman")
export default class CommanControler {
 @Post('/getsignurl')
  async upload(@Req() request: any, @Res() response: any) {
    try {
      const url = awsSigneUrl();
      return response.formatter.ok({url}, true, "FILE_UPLOAD_SUCCESS");
    } catch (error) {
      console.log("ERR:: ", error);
      return response.formatter.error({}, false, "FILE_UPLOAD_FAILED", error);
    }
  }
}
