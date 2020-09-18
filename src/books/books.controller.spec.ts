import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { CreateBookDto } from './create-book.dto';

describe('BooksController', () => {
  let booksService: BooksService;
  let booksController: BooksController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [BooksService],
      controllers: [BooksController]
    }).compile();

    booksService = moduleRef.get<BooksService>(BooksService);
    booksController = moduleRef.get<BooksController>(BooksController);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('GET /', () => {
    it('should call the books service with the search query', () => {
      jest.spyOn(booksService, 'find');
      booksController.find('testQuery');
      expect(booksService.find).toHaveBeenCalledTimes(1);
      expect(booksService.find).toBeCalledWith('testQuery');
    });
  });

  describe('POST /', () => {
    it('should call the books service with the create book dto', () => {
      const createBookDto: CreateBookDto = { title: 'foo', author: 'bar' };
      jest.spyOn(booksService, 'create'); 
      booksController.create(createBookDto);
      expect(booksService.create).toHaveBeenCalledTimes(1);
      expect(booksService.create).toBeCalledWith(createBookDto);
    });
  });
});
