import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  name: string;
}
