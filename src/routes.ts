import { Application } from "express";
import { useExpressServer } from "routing-controllers";
import CommanControler from "./api/signurl/comman.controller";
import ComapnyCotroller from "./api/company/company.controller";
import UserController from "./api/user/user.controller";
import PartyController from "./api/party/party.controller";

const basePath = `/api/v1`;

function initRoute(app: Application) {
    useExpressServer(app, {
        controllers: [
            UserController,
            ComapnyCotroller,
            CommanControler,
            PartyController 
        ],
        defaultErrorHandler: true,
        routePrefix: basePath
    })
}

export default initRoute