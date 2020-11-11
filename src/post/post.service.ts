import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PostModel } from '../model/post.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel)
    private readonly postModel: ReturnModelType<typeof PostModel>
  ) {}

  async find(filter: any): Promise<PostModel[]> {
    return this.postModel.find(filter).exec();
  }

  async findById(id: string): Promise<PostModel> {
    return this.postModel.findById(id).exec();
  }

  // async findOne(conditions: any, password?: boolean): Promise<PostModel> {
  //   if (password) {
  //     return this.postModel.findOne(conditions, '+password').exec();
  //   }
  //   return this.postModel.findOne(conditions).exec();
  // }

  async findMyPost(uid: string): Promise<PostModel[]> {
    return this.find({ownerId: uid});
  }

  async exists(id: string): Promise<boolean> {
    return this.postModel.exists({ _id: id });
  }

  async create(post: PostModel): Promise<PostModel> {
    const newPost = new this.postModel(post);
    return newPost.save();
  }

  async edit(pid: string, newContent: string): Promise<PostModel> {
    return this.postModel.findByIdAndUpdate(pid, {content: newContent}, {new: true}).exec();
  }

  async delete(pid: string) {
    this.postModel.findByIdAndDelete(pid).exec();
  }

}
