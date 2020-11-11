import { ApiProperty } from '@nestjs/swagger';

export class ContentDto {
    @ApiProperty()
    content: string;
}
