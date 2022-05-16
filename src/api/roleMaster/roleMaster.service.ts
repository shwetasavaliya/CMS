import {
    Model,
    FilterQuery,
    UpdateQuery,
    QueryFindOneAndUpdateOptions,
    QueryOptions
} from "mongoose";
import { IBaseService } from "src/baseService/baseService.interface";
import { Nullable } from "src/constants/customTypes";
import { IRole } from "./roleMaster.interface";
import { RoleModel } from "./roleMaster.model";

export default class RoleService implements IBaseService<IRole> {
    private model: Model<IRole>;
  
    public constructor() {
        this.model = RoleModel;
    }

    create = async (item: IRole): Promise<IRole> => {
        return this.model.create(item);
    };

    findById = async (
        id: string,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<Nullable<IRole>> => {
        return this.model.findById(id, projection, options);
    };

    findOne = async (
        query: any,
        options: QueryOptions = {},
        projection?: any | null
    ): Promise<Nullable<IRole>> => {
        return this.model.findOne(query, projection, options).lean();
    };

    updateOne = async (
        query: any,
        updateObj: UpdateQuery<IRole>,
        options: QueryFindOneAndUpdateOptions = { new: true, upsert: true }
    ): Promise<Nullable<IRole>> => {
        return this.model.findOneAndUpdate(query, updateObj, options).lean();
    };

    find = async (
        query: FilterQuery<IRole>,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<IRole[]> => {
        return this.model.find(query, projection, options);
    };

    update = async (
        query: any,
        updateObj: UpdateQuery<IRole>
    ): Promise<Nullable<IRole>> => {
        return this.model.findByIdAndUpdate(query, updateObj, { new: true });
    };

    delete = async (query: any): Promise<Nullable<IRole>> => {
        return this.model.findByIdAndRemove(query);
    };

    aggregate = async (pipeline: any[]):Promise<IRole[]>=> {
        return this.model.aggregate(pipeline);
    }
}