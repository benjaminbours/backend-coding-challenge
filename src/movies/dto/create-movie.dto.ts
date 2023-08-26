import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsString,
  IsDateString,
  IsDefined,
  IsNotEmpty,
  ArrayMinSize,
} from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String })
  @IsDefined()
  @IsDateString()
  releaseDate: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  genre: string[];
}
