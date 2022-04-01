import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../../config";
export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 12);
}

export const jwtTokenGenerate = (data: object) => {
  return jwt.sign(data, SECRET_KEY);
}
