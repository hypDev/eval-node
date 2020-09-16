import { Controller, Get, Post, Body, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDTO, SearchBooksDTO } from './book.dto';
import { Book } from './book.model';

@Controller()
export class BookController {
  constructor(private bookService: BookService){ }

  @Get()
  @UsePipes(ValidationPipe)
  find(@Query() search: SearchBooksDTO) {
    return this.bookService.search(search);
  }

  @Post('create')
  @UsePipes(ValidationPipe)
  create(@Body() bookDto: CreateBookDTO): Promise<Book> {
    return this.bookService.create(bookDto);
  }
}
