import {
    Model,
    FilterQuery,
    UpdateQuery,
    QueryFindOneAndUpdateOptions,
    QueryOptions
} from "mongoose";
import { IBaseService } from "src/baseService/baseService.interface";
import { Nullable } from "src/constants/customTypes";
import { ICompany } from "./company.interface";
import { CompanyModel } from "./company.model";

export default class CompanyService implements IBaseService<ICompany> {
    private model: Model<ICompany>;

    public constructor() {
        this.model = CompanyModel;
    }

    create = async (item: ICompany): Promise<ICompany> => {
        return this.model.create(item);
    };
    
    findById = async (
        id: string,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<Nullable<ICompany>> => {
        return this.model.findById(id, projection, options);
    };

    findOne = async (
        query: any,
        options: QueryOptions = {},
        projection?: any | null
    ): Promise<Nullable<ICompany>> => {
        return this.model.findOne(query, projection, options).lean();
    };
    
    updateOne = async (
        query: any,
        updateObj: UpdateQuery<ICompany>,
        options: QueryFindOneAndUpdateOptions = { new: true, upsert: true }
    ): Promise<Nullable<ICompany>> => {
        return this.model.findOneAndUpdate(query, updateObj, options).lean();
    };

    find = async (
        query: FilterQuery<ICompany>,
        projection: any = {},
        options: QueryOptions = { lean: true }
    ): Promise<ICompany[]> => {
        return this.model.find(query, projection, options);
    };

    update = async (
        query: any,
        updateObj: UpdateQuery<ICompany>
    ): Promise<Nullable<ICompany>> => {
        return this.model.findByIdAndUpdate(query, updateObj, {new:true});
    };
    delete = async (query: any): Promise<Nullable<ICompany>> => {
        return this.model.findByIdAndRemove('id');
    };
}