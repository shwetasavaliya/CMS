import { Body, JsonController, Post, Req, Res } from "routing-controllers";
import { IUser } from "./user.interface";
import UserService from "./user.service";
import { UserDTO } from "./user.validator";

@JsonController('/user')
export default class UserController {

    private userService: UserService = new UserService();

    @Post('/register', { transformResponse: true })
    async register(@Req() request: any, @Res() response: any, @Body({ validate: true }) body: UserDTO) {
        try {

            const {
                email,
                password,
                firstName,
                lastName,
                phone,
                city,
                state,
                country
            } = body;

            const userExists = await this.userService.findOne({ email });
            if (userExists) return response.formatter.error({}, false, 'USER_ALREADY_EXISTS');

            const userData: any = {
                email,
                password,
                firstName,
                lastName,
                phone,
                city,
                state,
                country
            }

            await this.userService.create(userData);

            return response.formatter.ok(userData, true, 'USER_REGISTER_SUCCESS');
        } catch (error) {
            console.log("ERR:: ", error)
            return response.formatter.error({}, false, 'USER_REGISTER_FAILED', error);
        }
    }
}