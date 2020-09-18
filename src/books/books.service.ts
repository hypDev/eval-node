import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Book } from './book.interface';
import { CreateBookDto } from './create-book.dto';

@Injectable()
export class BooksService {
  private readonly logger = new Logger(this.constructor.name);
  private database: Book[];

  constructor() {
    this.database = [];
  }

  create(book: CreateBookDto): boolean {
    if (this.database.some((book_) => book_.title === book.title )) {
      this.logger.error("A book with this title already exists.");
      throw new HttpException("A book with this title already exists.", HttpStatus.CONFLICT);
    }
    this.database.push(book);
    this.logger.log(`Added new book "${book.title}".`)
    return true;
  }

  find(query?: string): Book[] {
    const result: Book[] = query ? this.database.filter((book_) =>  book_.author === query) : this.database;
    return result.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0; 
    });
  }
}
