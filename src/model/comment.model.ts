import { prop, mongoose, pre } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';

export class CommentModel {
  _id?: mongoose.Types.ObjectId;

  @prop({ required: true })
  ownerName: string;
  
  @prop({ required: true })
  ownerId: string;
  
  @ApiProperty()
  @prop({ required: true })
  pid: string;
  
  @ApiProperty()
  @prop({ required: true })
  msg: string;
}
