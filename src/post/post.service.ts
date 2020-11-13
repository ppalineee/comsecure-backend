import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { PostModel } from '../model/post.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CommentModel } from 'src/model/comment.model';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(PostModel)
    private readonly postModel: ReturnModelType<typeof PostModel>,
    @InjectModel(CommentModel)
    private readonly commentModel: ReturnModelType<typeof CommentModel>
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

  async edit(pid: string, newTitle: string, newContent: string): Promise<PostModel> {
    return this.postModel.findByIdAndUpdate(pid, {title: newTitle, content: newContent}, {new: true}).exec();
  }

  async delete(pid: string) {
    this.postModel.findByIdAndDelete(pid).exec();
    this.commentModel.DeleteMany({pid: pid}).exec();
  }

}
