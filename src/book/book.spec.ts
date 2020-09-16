import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookRepository } from './book.repository';
import { Book, mockBook } from './book.model';

describe('Books', () => {
  
  let app: TestingModule;
  let bookController: BookController;
  let bookRepository: BookRepository;
  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService, BookRepository],
    }).compile();

    bookController = app.get<BookController>(BookController);
    bookRepository = app.get<BookRepository>(BookRepository);
  });

  const seedBooks = async (amount: number): Promise<Book[]> => {
    const books = [];
    for(let i=0; i < amount; i++){
      books.push( await bookRepository.createBook( mockBook() ) );
    }
    return books;
  }

  describe('BookController', () => {
    
    describe('GET / getBooks', () => {
      it('should return all books if no filters are provided', async () => {
        const books = await seedBooks(3);
        const res = await bookController.find({});
        expect(res.length).toBe(books.length);
      });

      it('Should always return books ordered by title', async () => {
        const books = await seedBooks(3);
        const res = await bookController.find({});
        const sorted = books.sort((a: Book, b: Book) => {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        });
        expect(res).toEqual(sorted);
      });

      it('Should filter by title when a title is provided', async () => {
        const books = await seedBooks(3);
        const res = await bookController.find({title: books[0].title});
        expect(res).toEqual([books[0]]);
      })
      it('Should filter by author when a author is provided', async () => {
        const books = await seedBooks(3);
        const res = await bookController.find({author: books[0].author});
        expect(res).toEqual([books[0]]);
      })
  });

  });
});
