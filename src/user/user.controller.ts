import { Controller, Get } from '@nestjs/common';
import { UserModel } from '../model/user.model';
import { User } from '../decorators/user.decorator';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  async me(@User() id: string): Promise<UserModel> {
    return this.userService.findById(id);
  }
}
