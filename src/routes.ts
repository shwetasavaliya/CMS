import { Application } from "express";
import { useExpressServer } from "routing-controllers";
import UserController from "./api/user/user.controller";
import ProjectController from "./api/projectMaster/projectMaster.controller";
import LanguageMasterController from './api/languageMaster/languageMaster.controller';
import RoleMasterController from './api/roleMaster/roleMaster.controller';


const basePath = `/api/v1`;

function initRoute(app: Application) {
    useExpressServer(app, {
        controllers: [
            UserController,
            ProjectController,
            LanguageMasterController,
            RoleMasterController
        ],
        defaultErrorHandler: true,
        routePrefix: basePath
    })
}

export default initRoute