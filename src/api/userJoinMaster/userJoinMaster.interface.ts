import * as Mongoose from "mongoose";

export interface IUserJoin extends Mongoose.Document {
    firstname? : String;
    lastname? : String;
    email? :String;
    password? : String;
}

