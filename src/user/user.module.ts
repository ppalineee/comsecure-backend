import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserModel } from '../model/user.model';

@Global()
@Module({
  imports: [
    TypegooseModule.forFeature([
      { typegooseClass: UserModel, schemaOptions: { timestamps: true } },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
