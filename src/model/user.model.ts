import { prop, mongoose, pre } from '@typegoose/typegoose';
import { hashSync } from 'bcryptjs';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enum/user.enum';

@pre<UserModel>('save', function () {
  if (this.password) {
    this.password = hashSync(this.password);
  }
})
export class UserModel {
  _id?: mongoose.Types.ObjectId;

  @ApiProperty()
  @prop({ required: true, unique: true })
  username: string;

  @ApiProperty()
  @prop({ required: true, select: false })
  password: string;

  @ApiProperty()
  @prop({ required: true, select: false })
  role: UserRole;
}
