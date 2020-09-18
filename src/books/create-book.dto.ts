import { IsNotEmpty, MinLength } from 'class-validator';
import { Book } from './book.interface';

export class CreateBookDto implements Book {
  @IsNotEmpty()
  @MinLength(1)
  title: string;

  @IsNotEmpty()
  @MinLength(2)
  author: string;
}