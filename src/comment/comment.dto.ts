import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentDto {
    @ApiProperty()
    @IsNotEmpty()
    pid: string;

    @ApiProperty()
    @IsNotEmpty()
    msg: string;
}

export class MsgDto {
    @ApiProperty()
    @IsNotEmpty()
    msg: string;
}
