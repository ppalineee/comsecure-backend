import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
    @ApiProperty()
    pid: string;

    @ApiProperty()
    msg: string;
}

export class MsgDto {
    @ApiProperty()
    msg: string;
}
