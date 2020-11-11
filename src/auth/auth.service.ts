import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto, AuthResponseDto } from './auth.dto';
import { UserModel } from '../model/user.model';
import { compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  async validateUser({
    username,
    password,
  }: AuthCredentialsDto): Promise<{ _id: string; username: string }> {
    const user: UserModel = await this.userService.findOne({ username }, true);
    if (user && compareSync(password, user.password)) {
      const { _id, username } = user;
      return { _id, username };
    }
    return null;
  }

  async login(credential: AuthCredentialsDto): Promise<string> {
    const user = await this.validateUser(credential);
    if (!user) {
      throw new UnauthorizedException('Wrong username or password');
    }
    const access_token = this.jwtService.sign({ user });
    return access_token;
  }

  async register(user: UserModel): Promise<string> {
    const existedUser: UserModel = await this.userService.findOne({ username: user.username });
    if (existedUser) {
      throw new BadRequestException('Username already existed');
    }
    await this.userService.create(user);
    return this.login({ username: user.username, password: user.password });
  }
}
