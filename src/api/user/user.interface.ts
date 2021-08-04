import * as Mongoose from 'mongoose';

interface IProfile {
    orignal?: string;
    thumb?: string;
}

export interface IUser extends Mongoose.Document {
    email: string;
    password: string;
    firstName?: string;
    middleName?: string;
    lastName?: string;
    userName?: string;
    accessToken?: string;
    tokenCreatedAtTime?: number;
    tokenUpdatedAtTime?: number;
    companyId: Mongoose.Schema.Types.ObjectId;
    profilePictures?: IProfile;
    phone?: string;
    city?: string;
    state?: string;
    country?: string;
    otp?: string;
    resetPasswordToken:string;
    isEmailVerified?: boolean;
    isPhoneVerified?: boolean;
    language?: string;
    isDeleted?: boolean;
    isBlocked?: boolean;
    localCreatedAt?: number;
}