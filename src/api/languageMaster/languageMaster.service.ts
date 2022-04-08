import {
    Model,
    FilterQuery,
    UpdateQuery,
    QueryFindOneAndUpdateOptions,
    QueryOptions
} from "mongoose";
import { IBaseService } from "src/baseService/baseService.interface";
import { Nullable } from "src/constants/customTypes";
import { ILanguageMaster } from "./languageMaster.interface";
import { LanguageMasterModel } from "./languageMaster.model";

export default class LanguageMasterService implements IBaseService<ILanguageMaster> {
    private model: Model<ILanguageMaster>;
  
    public constructor() {
        this.model = LanguageMasterModel;
    }

    create = async (item: ILanguageMaster): Promise<ILanguageMaster> => {
        return this.model.create(item);
    };

    findById = async (
        id: string,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<Nullable<ILanguageMaster>> => {
        return this.model.findById(id, projection, options);
    };

    findOne = async (
        query: any,
        options: QueryOptions = {},
        projection?: any | null
    ): Promise<Nullable<ILanguageMaster>> => {
        return this.model.findOne(query, projection, options).lean();
    };

    updateOne = async (
        query: any,
        updateObj: UpdateQuery<ILanguageMaster>,
        options: QueryFindOneAndUpdateOptions = { new: true, upsert: true }
    ): Promise<Nullable<ILanguageMaster>> => {
        return this.model.findOneAndUpdate(query, updateObj, options).lean();
    };

    find = async (
        query: FilterQuery<ILanguageMaster>,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<ILanguageMaster[]> => {
        return this.model.find(query, projection, options);
    };

    update = async (
        query: any,
        updateObj: UpdateQuery<ILanguageMaster>
    ): Promise<Nullable<ILanguageMaster>> => {
        return this.model.findByIdAndUpdate(query, updateObj, { new: true });
    };

    delete = async (query: any): Promise<Nullable<ILanguageMaster>> => {
        return this.model.findByIdAndRemove(query);
    };
}