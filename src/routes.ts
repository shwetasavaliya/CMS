import { Application } from "express";
import { useExpressServer } from "routing-controllers";
import UserController from "./api/user/user.controller";

const basePath = `/api/v1`;

function initRoute(app: Application) {
    useExpressServer(app, {
        controllers: [
            UserController
        ],
        defaultErrorHandler: true,
        routePrefix: basePath
    })
}

export default initRoute