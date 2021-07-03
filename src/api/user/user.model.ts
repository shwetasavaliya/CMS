import * as Mongoose from 'mongoose';
import { IUser } from './user.interface';

export const UsersSchema: Mongoose.Schema<IUser> = new Mongoose.Schema(
    {
        email: { type: String, required: true, lowercase: true },
        password: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: false },
        accessToken: { type: String, required: false },
        tokenCreatedAtTime: { type: Number, default: 0, required: true },
        tokenUpdatedAtTime: { type: Number, default: 0, required: true },
        profilePictures: {
            orignal: { type: String, default: '' },
            thumb: { type: String, default: '' }
        },
        phone: { type: String, required: false, default: '', trim: true },
        city: { type: String, required: false, default: '' },
        state: { type: String, required: false, default: '' },
        country: { type: String, required: false, default: '' },
        isEmailVerified: { type: Boolean, required: true, default: false },
        isPhoneVerified: { type: Boolean, required: true, default: false },
        language: { type: String, enum: ['ENGLISH'], default: 'ENGLISH' },
        isDeleted: { type: Boolean, default: false },
        isBlocked: { type: Boolean, default: false },
        localCreatedAt: { type: Number },
    }
);

export const UserModel = Mongoose.model<IUser>(
    'users',
    UsersSchema
);
