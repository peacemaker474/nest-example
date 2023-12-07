import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('영화 API')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: '모든 영화 목록 받아오기 API ' })
  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @ApiOperation({ summary: '하나의 영화 목록 받아오기 API' })
  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.moviesService.getOne(movieId);
  }

  @ApiOperation({ summary: '영화 생성 API' })
  @ApiCreatedResponse({ description: '영화를 생성한다.' })
  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }

  @ApiOperation({ summary: '하나의 영화 목록 삭제 API' })
  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.moviesService.deleteOne(movieId);
  }

  @ApiOperation({ summary: '영화 수정 API' })
  @Patch('/:id')
  patchMovie(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.moviesService.update(movieId, updateData);
  }
}
