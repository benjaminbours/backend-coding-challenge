import { ApiProperty } from '@nestjs/swagger';
import { Movie as PrismaMovie } from '@prisma/client';
import { Genre } from '../../genres/entities/genre.entity';

export class Movie implements PrismaMovie {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Date })
  releaseDate: Date;

  @ApiProperty({ type: [Genre] })
  genre: Genre[];
}
