import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { UserModel } from '../model/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: ReturnModelType<typeof UserModel>
  ) {}

  async find(filter: any): Promise<UserModel[]> {
    return this.userModel.find(filter).exec();
  }

  async findById(id: string): Promise<UserModel> {
    return this.userModel.findById(id).exec();
  }

  async findOne(conditions: any, password?: boolean): Promise<UserModel> {
    if (password) {
      return this.userModel.findOne(conditions, '+password').exec();
    }
    return this.userModel.findOne(conditions).exec();
  }

  async exists(id: string): Promise<boolean> {
    return this.userModel.exists({ _id: id });
  }

  async create(user: UserModel): Promise<UserModel> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
}
