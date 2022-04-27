import {
  Model,
  FilterQuery,
  UpdateQuery,
  QueryFindOneAndUpdateOptions,
  QueryOptions
} from "mongoose";
import { IBaseService } from "src/baseService/baseService.interface";
import { Nullable } from "src/constants/customTypes";
import { IUserProject } from "./userProjectMaster.interface";
import { UserProjectModel } from "./userProjectMaster.model";

export default class UserProjectService implements IBaseService<IUserProject> {
  private model: Model<IUserProject>;

  public constructor() {
      this.model = UserProjectModel;
  }

  create = async (item: IUserProject): Promise<IUserProject> => {
      return this.model.create(item);
  };

  findById = async (
      id: string,
      projection: any = {},
      options: QueryOptions = { lean: true }
  ): Promise<Nullable<IUserProject>> => {
      return this.model.findById(id, projection, options);
  };

  findOne = async (
      query: any,
      options: QueryOptions = {},
      projection?: any | null
  ): Promise<Nullable<IUserProject>> => {
      return this.model.findOne(query, projection, options).lean();
  };

  updateOne = async (
      query: any,
      updateObj: UpdateQuery<IUserProject>,
      options: QueryFindOneAndUpdateOptions = { new: true, upsert: true }
  ): Promise<Nullable<IUserProject>> => {
      return this.model.findOneAndUpdate(query, updateObj, options).lean();
  };

  find = async (
      query: FilterQuery<IUserProject>,
      projection: any = {},
      options: QueryOptions = { lean: true }
  ): Promise<IUserProject[]> => {
      return this.model.find(query, projection, options);
  };

  update = async (
      query: any,
      updateObj: UpdateQuery<IUserProject>
  ): Promise<Nullable<IUserProject>> => {
      return this.model.findByIdAndUpdate(query, updateObj, { new: true });
  };

  delete = async (query: any): Promise<Nullable<IUserProject>> => {
      return this.model.findByIdAndRemove(query);
  };

  aggregate = async (pipeline: any[]):Promise<IUserProject[]>=> {
      return this.model.aggregate(pipeline);
  }
}

  