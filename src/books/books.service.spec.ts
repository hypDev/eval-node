import { HttpException } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';
import { Book } from './book.interface';

const mockBook = (title: string, author: string): Book => ({ title, author });
const mockBookOne: Book = mockBook('foo c', 'bar');
const mockBookTwo: Book = mockBook('foo a', 'bar 2');
const mockBookThree: Book = mockBook('foo b', 'bar');

describe('BooksService', () => {
  let booksService: BooksService;

  beforeEach(() => {
    booksService = new BooksService();
    booksService.create(<CreateBookDto>mockBookOne);
    booksService.create(<CreateBookDto>mockBookTwo);
    booksService.create(<CreateBookDto>mockBookThree);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('find', () => {
    it('should return all books alphabetically by title if no search query is provided', () => {
      const result: Book[] = booksService.find();
      expect(result).toHaveLength(3);
      expect(result).toEqual([
        mockBookTwo,
        mockBookThree,
        mockBookOne,
      ]);
    });

    it('should return all books by author in alphabetical order if the search query is provided', () => {
      const result: Book[] = booksService.find('bar');
      expect(result).toHaveLength(2);
      expect(result).toEqual([
        mockBookThree,
        mockBookOne,
      ]);
    });
  });

  describe('create', () => {
    it('should create a new book if a book with the title does not exist', () => {
      expect(booksService.create({ title: 'foo d', author: 'bar 3' })).toEqual(true);
      const result: Book[] = booksService.find('bar 3');
      expect(result).toHaveLength(1);
      expect(result[0].title).toEqual('foo d');
    });

    it('should throw if a book with the title already exists', () => {
      expect(() => booksService.create(<CreateBookDto>mockBookOne)).toThrowError(HttpException);
    })
  });
});
