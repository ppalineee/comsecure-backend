import { prop, mongoose, pre } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class CommentModel {
  @IsMongoId()
  _id?: mongoose.Types.ObjectId;

  @prop({ required: true })
  ownerName: string;
  
  @prop({ required: true })
  ownerId: string;
  
  @ApiProperty()
  @IsMongoId()
  @prop({ required: true })
  pid: string;
  
  @ApiProperty()
  @prop({ required: true })
  msg: string;
}
