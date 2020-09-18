import { Body, Controller, Post, Get, Query, ValidationPipe } from '@nestjs/common';
import { CreateBookDto } from './create-book.dto';
import { Book } from './book.interface';
import { BooksService } from './books.service';

@Controller()
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body(new ValidationPipe()) newBook: CreateBookDto): Promise<boolean> {
    return this.booksService.create(newBook);
  }

  @Get()
  async find(@Query('search') query?: string): Promise<Book[]> {
    return this.booksService.find(query);
  }
}
