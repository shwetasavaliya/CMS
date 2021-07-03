import * as Mongoose from 'mongoose';
import { IBaseService } from 'src/baseService/baseService.interface';

interface IProfile {
    orignal?: string;
    thumb?: string;
}

export interface IUser extends Mongoose.Document {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    accessToken?: string;
    tokenCreatedAtTime?: number;
    tokenUpdatedAtTime?: number;
    profilePictures?: IProfile;
    phone?: string;
    city?: string;
    state?: string;
    country?: string;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    language?: string;
    isDeleted?: boolean;
    isBlocked?: boolean;
    localCreatedAt?: number;
}