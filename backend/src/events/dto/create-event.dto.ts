import { IsNotEmpty, IsOptional, IsString, IsArray } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsArray()
  media?: { type: 'image' | 'video'; url: string }[];
}
