import { IsOptional, Length, IsString } from 'class-validator'

export class CreateBookDTO {
  @Length(1)
  title: string;
  @IsString()
  @Length(2)
  author: string;
}

export class SearchBooksDTO {
  @IsOptional()
  @Length(1)
  title?: string;
  @IsOptional()
  @Length(1)
  author?: string;
}