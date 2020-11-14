import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from '../decorators/user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { UserModel } from 'src/model/user.model';
import { RolesGuard } from 'src/guards/role.guard';
import { UserRole } from 'src/enum/user.enum';
import { Roles } from 'src/decorators/role.decorator';
import { CommentDto, MsgDto } from './comment.dto';
import { CommentModel } from 'src/model/comment.model';

@ApiBearerAuth()
@UseGuards(RolesGuard)
@ApiTags('Comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get()
    async listComment(): Promise<CommentModel[]> {
        return this.commentService.find({});
    }
 
    @Get(":cid")
    async getComment(@Param('cid') cid: string): Promise<CommentModel> {
        return this.commentService.findById(cid);
    }

    @Get("pid/:pid")
    async getCommentByPid(@Param('pid') pid: string): Promise<CommentModel[]> {
        return this.commentService.find({pid: pid});
    }
    
    @Post()
    async createComment(@Body() commentDto: CommentDto, @User() user: UserModel): Promise<CommentModel> {
        return this.commentService.create({ownerName: user.username, ownerId: user._id , pid: commentDto.pid , msg: commentDto.msg});
    }

    @Patch(":cid")
    async editComment(@Param('cid') cid: string, @Body() msgDto: MsgDto, @User() user: UserModel) {
        const comment: CommentModel = await this.commentService.findById(cid);
        if (comment.ownerId == user._id || user.role == UserRole.Admin) {
            return this.commentService.edit(cid, msgDto.msg);
        } else {
            throw new BadRequestException('Permission denied.')
        }
    }

    @Delete(":cid")
    async deleteComment(@Param('cid') cid: string, @User() user: UserModel) {
        const comment: CommentModel = await this.commentService.findById(cid);
        if (comment.ownerId == user._id || user.role == UserRole.Admin) {
            this.commentService.delete(cid);
        }
    }

}
