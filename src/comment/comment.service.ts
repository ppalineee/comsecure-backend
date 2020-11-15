import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { CommentModel } from '../model/comment.model';
import { mongoose, ReturnModelType } from '@typegoose/typegoose';
import { PostModel } from 'src/model/post.model';
import { PostService } from 'src/post/post.service';

@Injectable()
export class CommentService {
  PostService: any;
  constructor(
    @InjectModel(CommentModel)
    private readonly commentModel: ReturnModelType<typeof CommentModel>,
    @InjectModel(PostModel)
    private readonly postModel: ReturnModelType<typeof PostModel>,
    private readonly postService: PostService
  ) {}

  async find(filter: any): Promise<CommentModel[]> {
    return this.commentModel.find(filter).exec();
  }

  async findById(id: string): Promise<CommentModel> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Cid is not valid');
    }
    const existCid = await this.exists(id).then((result) => { return result; });
    if (!existCid) {
      throw new BadRequestException('Cid does not exist');
    }
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
    if (!mongoose.Types.ObjectId.isValid(comment.pid)) {
      throw new BadRequestException('Pid is not valid');
    }
    const existPid = await this.postService.exists(comment.pid).then((result) => { return result; });
    if (!existPid) {
      throw new BadRequestException('Pid does not exist');
    }
    const newComment = new this.commentModel(comment);
    return newComment.save();
  }

  async edit(cid: string, newMsg: string): Promise<CommentModel> {
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      throw new BadRequestException('Cid is not valid');
    }
    const existCid = await this.exists(cid).then((result) => { return result; });
    if (!existCid) {
      throw new BadRequestException('Cid does not exist');
    }
    return this.commentModel.findByIdAndUpdate(cid, {msg: newMsg}, {new: true}).exec();
  }

  async delete(cid: string) {
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      throw new BadRequestException('Cid is not valid');
    }
    const existCid = await this.exists(cid).then((result) => { return result; });
    if (!existCid) {
      throw new BadRequestException('Cid does not exist');
    }
    this.commentModel.findByIdAndDelete(cid).exec();
  }

}
