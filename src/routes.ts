import { Application } from "express";
import { useExpressServer } from "routing-controllers";
import UserController from "./api/user/user.controller";
import ProjectController from "./api/projectMaster/projectMaster.controller";
import LanguageMasterController from './api/languageMaster/languageMaster.controller';


const basePath = `/api/v1`;

function initRoute(app: Application) {
    useExpressServer(app, {
        controllers: [
            UserController,
            ProjectController,
            LanguageMasterController
        ],
        defaultErrorHandler: true,
        routePrefix: basePath
    })
}

export default initRoute