import { prop, mongoose, pre } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enum/user.enum';
import { IsEnum, IsNotEmpty } from 'class-validator';

@pre<UserModel>('save', function () {
  if (this.password) {
    this.password = hashSync(this.password);
  }
})
export class UserModel {
  _id?: mongoose.Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  @prop({ required: true, unique: true })
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @prop({ required: true, select: false })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserRole)
  @prop({ required: true })
  role: UserRole;
}
