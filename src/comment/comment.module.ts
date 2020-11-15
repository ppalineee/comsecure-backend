import { Global, Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { CommentModel } from '../model/comment.model';
import { CommentService } from './comment.service';
import { PostModel } from 'src/model/post.model';

@Global()
@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: CommentModel, schemaOptions: { timestamps: true } },
      { typegooseClass: PostModel, schemaOptions: { timestamps: true } },
    ]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
