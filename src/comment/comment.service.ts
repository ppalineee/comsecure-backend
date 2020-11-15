import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CommentModel } from '../model/comment.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { PostModel } from 'src/model/post.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(CommentModel)
    private readonly commentModel: ReturnModelType<typeof CommentModel>,
    @InjectModel(PostModel)
    private readonly postModel: ReturnModelType<typeof PostModel>
  ) {}

  async find(filter: any): Promise<CommentModel[]> {
    return this.commentModel.find(filter).exec();
  }

  async findById(id: string): Promise<CommentModel> {
    return this.commentModel.findById(id).exec();
  }

  // async findOne(conditions: any, password?: boolean): Promise<PostModel> {
  //   if (password) {
  //     return this.postModel.findOne(conditions, '+password').exec();
  //   }
  //   return this.postModel.findOne(conditions).exec();
  // }

  async exists(id: string): Promise<boolean> {
    return this.commentModel.exists({ _id: id });
  }

  async create(comment: CommentModel): Promise<CommentModel> {
    if (this.postModel.exists(comment.pid)) {
      throw new BadRequestException('Pid does not exist');
    }
    const newComment = new this.commentModel(comment);
    return newComment.save();
  }

  async edit(cid: string, newMsg: string): Promise<CommentModel> {
    return this.commentModel.findByIdAndUpdate(cid, {msg: newMsg}, {new: true}).exec();
  }

  async delete(cid: string) {
    this.commentModel.findByIdAndDelete(cid).exec();
  }

}
