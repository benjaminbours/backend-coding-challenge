import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class MoviesService {
  constructor(private prismaService: PrismaService) {}
  create(createMovieDto: CreateMovieDto) {
    const { genre, releaseDate, ...dto } = createMovieDto;
    return this.prismaService.movie
      .create({
        data: {
          ...dto,
          releaseDate: new Date(releaseDate),
          genre: {
            connectOrCreate: genre.map((genre) => {
              return {
                where: {
                  name: genre,
                },
                create: {
                  name: genre,
                },
              };
            }),
          },
        },
        include: {
          genre: true,
        },
      })
      .catch((err) => {
        Logger.error(err);

        if (err instanceof PrismaClientKnownRequestError) {
          throw new BadRequestException('Movie already exist');
        }
        throw err;
      });
  }

  findAll(search?: string) {
    const where: Prisma.MovieWhereInput = {};
    if (search) {
      where.OR = [
        {
          title: {
            startsWith: search,
          },
        },
        {
          genre: { some: { name: { startsWith: search } } },
        },
      ];
    }
    return this.prismaService.movie.findMany({
      where,
      include: { genre: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.movie
      .findUnique({
        where: { id },
        include: {
          genre: true,
        },
      })
      .catch((err) => {
        Logger.error(err);
        throw new NotFoundException();
      });
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    const { genre, releaseDate, ...dto } = updateMovieDto;
    return this.prismaService.movie
      .update({
        where: { id },
        data: {
          ...dto,
          ...(releaseDate
            ? {
                releaseDate: new Date(releaseDate),
              }
            : {}),
          ...(genre
            ? {
                genre: {
                  set: [],
                  connectOrCreate: genre.map((genre) => {
                    return {
                      where: {
                        name: genre,
                      },
                      create: {
                        name: genre,
                      },
                    };
                  }),
                },
              }
            : {}),
        },
        include: {
          genre: true,
        },
      })
      .catch((err) => {
        Logger.error(err);
        throw new NotFoundException();
      });
  }

  remove(id: number) {
    return this.prismaService.movie.delete({ where: { id } }).catch((err) => {
      Logger.error(err);
      throw new NotFoundException();
    });
  }
}
