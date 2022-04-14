import {
    Model,
    FilterQuery,
    UpdateQuery,
    QueryFindOneAndUpdateOptions,
    QueryOptions
} from "mongoose";
import { IBaseService } from "src/baseService/baseService.interface";
import { Nullable } from "src/constants/customTypes";
import { IUserJoin } from "./userJoinMaster.interface";
import { UserJoinModel } from "./userJoinMaster.model";

export default class UserJoinService implements IBaseService<IUserJoin> {
    private model: Model<IUserJoin>;
  
    public constructor() {
        this.model = UserJoinModel;      
    }

    create = async (item: IUserJoin): Promise<IUserJoin> => {
        return this.model.create(item);
    };

    findById = async (
        id: string,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<Nullable<IUserJoin>> => {
        return this.model.findById(id, projection, options);
    };

    findOne = async (
        query: any,
        options: QueryOptions = {},
        projection?: any | null
    ): Promise<Nullable<IUserJoin>> => {
        return this.model.findOne(query, projection, options).lean();
    };

    updateOne = async (
        query: any,
        updateObj: UpdateQuery<IUserJoin>,
        options: QueryFindOneAndUpdateOptions = { new: true, upsert: true }
    ): Promise<Nullable<IUserJoin>> => {
        return this.model.findOneAndUpdate(query, updateObj, options).lean();
    };

    find = async (
        query: FilterQuery<IUserJoin>,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<IUserJoin[]> => {
        return this.model.find(query, projection, options);
    };

    update = async (
        query: any,
        updateObj: UpdateQuery<IUserJoin>
    ): Promise<Nullable<IUserJoin>> => {
        return this.model.findByIdAndUpdate(query, updateObj, { new: true });
    };

    delete = async (query: any): Promise<Nullable<IUserJoin>> => {
        return this.model.findByIdAndRemove(query);
    };
}