import {
    Injectable,
    CanActivate,
    ExecutionContext,
    Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from '../user/user.service';
import { UserModel } from '../model/user.model';

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(
        @Inject('UserService') private readonly userService: UserService,
        private readonly reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // getClass must be used at class level
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user: UserModel = await this.userService.findById(request.userId);
        return roles.includes(user.role);
    }
}