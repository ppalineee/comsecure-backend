import { Global, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { PostModel } from '../model/post.model';
import { PostService } from './post.service';

@Global()
@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: PostModel, schemaOptions: { timestamps: true } },
    ]),
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
