import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GenresService } from './genres.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Genre } from './entities/genre.entity';
// import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @ApiCreatedResponse({
    description: 'Return the successfully created genre',
    type: Genre,
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genresService.create(createGenreDto);
  }

  @ApiOkResponse({
    description: 'List of all genres',
    type: [Genre],
  })
  @Get()
  findAll() {
    return this.genresService.findAll();
  }

  @ApiOkResponse({
    description: 'Return one genre by ID',
    type: Genre,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genresService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateGenreDto: UpdateGenreDto) {
  //   return this.genresService.update(+id, updateGenreDto);
  // }

  @ApiOkResponse({
    description: 'Return the deleted genre',
    type: Genre,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genresService.remove(+id);
  }
}
