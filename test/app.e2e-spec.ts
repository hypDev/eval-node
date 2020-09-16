import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Book, mockBook } from '../src/book/book.model';
import { BookRepository } from '../src/book/book.repository';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let repo: BookRepository
  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    repo = app.get<BookRepository>(BookRepository)
    await app.init();
  });

  const seedBook = (book: Book): request.Test => {
    return (request( app.getHttpServer()))
      .post("/create" )
      .send({...book})
  }

  describe('/ GET', () => {

    it('/ (GET) retrieves empty set of books before seeding', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect([]);
    });
  
    it('/ (GET) retrieves non-empty set of books after seeding (ordered by title)', async () => {
      const books = await repo.sortBy([mockBook(), mockBook()], "title")
  
      await seedBook(books[0])
      await seedBook(books[1])
  
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect([...books]);
    })
  })

  describe('/ POST', () => {

    it('Valid data, creates a book and returns it', async () => {
      const book = mockBook();
      await seedBook(book)
          .expect(201)
          .expect({...book})
    })
  
    it('Throws error if duplicate title', async () => {
      const book = mockBook();
      await seedBook(book)
        .expect(201)
        .expect({...book})

      await seedBook(book)
        .expect(400)
    })

    it('Throws Error if title or author is missing', async () => {
      const bookNoTitle = mockBook({title: null, author: "test author"});
      const bookNoAuthor = mockBook({title: "test title", author: null});
      await seedBook(bookNoTitle).expect(400);
      await seedBook(bookNoAuthor).expect(400);
    })

  })


});
