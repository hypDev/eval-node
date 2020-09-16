import { Book } from './book.model';
import { CreateBookDTO, SearchBooksDTO } from './book.dto';
import { BadRequestException } from '@nestjs/common';

export class BookRepository {
  private db = [];
  async getBooks(search: SearchBooksDTO): Promise<Book[]> {
    const {title, author } = search;
    const books: Book[] = this.db.filter((book: Book) => {
      let match = true;
      if(title){
        match = book.title.includes(title);
      }
      if(author && match){
        match = book.author.includes(author);
      }
      return match
    })
    return this.sortBy(books, 'title');
  }

  async createBook(bookDTO: CreateBookDTO): Promise<Book> {
    const book = new Book({
      title: bookDTO.title,
      author: bookDTO.author,
    });


    const existing = await this.bookExists({...book})
    if(existing){
      throw new BadRequestException("Title already exists");
    }
    this.db.push(book);
    return book;
  }

  async sortBy(books: Book[], column: keyof Book): Promise<Book[]>{
    return books.sort((a: Book, b: Book) => {
      if (a[column] < b[column]) {
        return 1;
      }
      if (a[column] > b[column]) {
        return -1;
      }
      return 0;
    });
  }

  /**
   * Note: Technically, this is not as efficient as your .some, since your .some would have short circuited
   * once it found a match, and the 'getBooks' will check all books in the repo. However, once hooked up to any
   * database, the manual filter would be thrown out in favor of a database WHERE of some kind, so a slight deoptimization
   * in favor of reusing code here seemed reasonable
   */

  async bookExists(search: SearchBooksDTO): Promise<boolean> {
    return !!(await this.getBooks({title: search.title, author: search.author})).length;
  }
}