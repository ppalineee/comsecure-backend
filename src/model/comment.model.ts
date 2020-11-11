import { prop, mongoose, pre } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from './user.model';

export class CommentModel {
  _id?: mongoose.Types.ObjectId;

  @ApiProperty()
  @prop({ required: true })
  pid: string;

  @ApiProperty()
  @prop({ required: true })
  owner: UserModel;

  @ApiProperty()
  @prop({ required: true })
  content: string;
}
