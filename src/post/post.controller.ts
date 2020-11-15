import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { PostModel } from '../model/post.model';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { UserModel } from 'src/model/user.model';
import { RolesGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/enum/user.enum';
import { Roles } from 'src/decorators/role.decorator';
import { PostDto } from './post.dto';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@ApiTags('Post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async listPost(): Promise<PostModel[]> {
    return this.postService.find({});
  }

  @Get(":pid")
  async getPost(@Param('pid') pid: string): Promise<PostModel> {
    return this.postService.findById(pid);
  }

  @Post()
  async createPost(@Body() postDto: PostDto, @User() user: UserModel): Promise<PostModel> {
    return this.postService.create({ownerName: user.username, ownerId: user._id, title: postDto.title ,content: postDto.content});
  }

  @Patch(":pid")
  async editPost(@Param('pid') pid: string, @Body() postDto: PostDto, @User() user: UserModel) {
    const post: PostModel = await this.postService.findById(pid);
    if (post.ownerId == user._id || user.role == UserRole.Admin) {
        return this.postService.edit(pid, postDto.title, postDto.content);
    } else {
        throw new BadRequestException('Permission denied')
    }
  }

  @Delete(":pid")
  async deletePost(@Param('pid') pid: string, @User() user: UserModel) {
    const post: PostModel = await this.postService.findById(pid);
    if (post.ownerId == user._id || user.role == UserRole.Admin) {
        this.postService.delete(pid);
    } else {
      throw new BadRequestException('Permission denied')
    }
  }

}
