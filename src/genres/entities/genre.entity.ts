import { ApiProperty } from '@nestjs/swagger';
import { Genre as PrismaGenre } from '@prisma/client';

export class Genre implements PrismaGenre {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;

  @ApiProperty({ type: String })
  name: string;
}
