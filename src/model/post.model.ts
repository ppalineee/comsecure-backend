import { prop, mongoose, pre } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from './user.model';

export class PostModel {
  _id?: mongoose.Types.ObjectId;

  @prop({ required: true })
  ownerName: string;

  @prop({ required: true })
  ownerId: string;

  @ApiProperty()
  @prop({ required: true })
  title: string;

  @ApiProperty()
  @prop({ required: true })
  content: string;

}
