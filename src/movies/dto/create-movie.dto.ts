import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty({
    example: 'The Shawshank Redemption',
    description: '제목',
    required: true,
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: '1994',
    description: '제작연도',
    required: true,
  })
  @IsNumber()
  readonly year: number;

  @ApiPropertyOptional({
    example: ['action'],
    description: '장르',
  })
  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
