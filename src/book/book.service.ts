import { Injectable } from '@nestjs/common';
import { CreateBookDTO, SearchBooksDTO } from './book.dto';
import { Book } from './book.model';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor (
    private bookRepository: BookRepository,
  ) {}
  private db = [];
  async search(search: SearchBooksDTO): Promise<Book[]>{
    return this.bookRepository.getBooks(search);
  };
  async create(book: CreateBookDTO): Promise<Book>{
    return this.bookRepository.createBook(book);
  }
}