import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiCreatedResponse({
    description: 'Return the successfully created movie',
    type: Movie,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }

  @ApiOkResponse({
    description: 'List of all movies',
    type: [Movie],
  })
  @ApiQuery({
    name: 'search',
    description: 'The name of the movie or genre you are looking for',
    type: 'string',
    required: false,
  })
  @Get()
  findAll(@Query('search') search: string | undefined) {
    return this.moviesService.findAll(search);
  }

  @ApiOkResponse({
    description: 'Return one movie by id',
    type: Movie,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(+id);
  }

  @ApiOkResponse({
    description: 'Return the successfully updated movie',
    type: Movie,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @ApiOkResponse({
    description: 'Return the deleted movie',
    type: Movie,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(+id);
  }
}
