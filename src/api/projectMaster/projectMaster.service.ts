import {
    Model,
    FilterQuery,
    UpdateQuery,
    QueryFindOneAndUpdateOptions,
    QueryOptions
} from "mongoose";
import { IBaseService } from "src/baseService/baseService.interface";
import { Nullable } from "src/constants/customTypes";
import { IProjectMaster } from "./projectMaster.interface";
import { ProjectMasterModel } from "./projectMaster.model";

export default class ProjectMasterService implements IBaseService<IProjectMaster> {
    private model: Model<IProjectMaster>;
  
    public constructor() {
        this.model = ProjectMasterModel;
    }

    create = async (item: IProjectMaster): Promise<IProjectMaster> => {
        return this.model.create(item);
    };

    findById = async (
        id: string,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<Nullable<IProjectMaster>> => {
        return this.model.findById(id, projection, options);
    };

    findOne = async (
        query: any,
        options: QueryOptions = {},
        projection?: any | null
    ): Promise<Nullable<IProjectMaster>> => {
        return this.model.findOne(query, projection, options).lean();
    };

    updateOne = async (
        query: any,
        updateObj: UpdateQuery<IProjectMaster>,
        options: QueryFindOneAndUpdateOptions = { new: true, upsert: true }
    ): Promise<Nullable<IProjectMaster>> => {
        return this.model.findOneAndUpdate(query, updateObj, options).lean();
    };

    find = async (
        query: FilterQuery<IProjectMaster>,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<IProjectMaster[]> => {
        return this.model.find(query, projection, options);
    };

    update = async (
        query: any,
        updateObj: UpdateQuery<IProjectMaster>
    ): Promise<Nullable<IProjectMaster>> => {
        return this.model.findByIdAndUpdate(query, updateObj, { new: true });
    };

    delete = async (query: any): Promise<Nullable<IProjectMaster>> => {
        return this.model.findByIdAndRemove('id');
    };
}