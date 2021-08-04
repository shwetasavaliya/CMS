import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../config";
import { Req, Res } from "routing-controllers";
import { NextFunction } from "express";

export class Auth {
  use(@Req() request: any, @Res() response: any, next: NextFunction) {
    const token = request.headers["authorization"];

    try {
      const verifyToken = jwt.verify(token, SECRET_KEY);
      request.data = verifyToken;
      next();
    } catch (error) {
      console.log("Error  ::::  "  , error);
      response.status(401).json({
        error: error.message ? error.message : error,
      });
    }
  }
}
