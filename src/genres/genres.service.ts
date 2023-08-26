import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
// import { UpdateGenreDto } from './dto/update-genre.dto';
import { PrismaService } from '../prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class GenresService {
  constructor(private prismaService: PrismaService) {}

  create(createGenreDto: CreateGenreDto) {
    return this.prismaService.genre
      .create({ data: createGenreDto })
      .catch((err) => {
        Logger.error(err);

        if (err instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException('Genre already exist');
        }
        throw err;
      });
  }

  findAll() {
    return this.prismaService.genre.findMany();
  }

  findOne(id: number) {
    return this.prismaService.genre
      .findUnique({ where: { id } })
      .catch((err) => {
        Logger.error(err);
        throw new NotFoundException();
      });
  }

  // update(id: number, updateGenreDto: UpdateGenreDto) {
  //   return `This action updates a #${id} genre`;
  // }

  remove(id: number) {
    return this.prismaService.genre.delete({ where: { id } }).catch((err) => {
      Logger.error(err);
      throw new NotFoundException();
    });
  }
}
