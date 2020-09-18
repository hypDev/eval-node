import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { BooksModule } from '../src/books/books.module';

describe('Books (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BooksModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ POST', async () => {
    await request(app.getHttpServer())
      .post('/')
      .send({ title: 'foo b', author: 'bar 2' })
      .expect(201)
      .expect('true')
    await request(app.getHttpServer())
      .post('/')
      .send({ title: 'foo a', author: 'bar' })
      .expect(201)
      .expect('true')
    await request(app.getHttpServer())
      .post('/')
      .send({ title: 'foo a', author: 'bar' })
      .expect(409);
  });

  it('/ GET', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect([
        {
          title: 'foo a',
          author: 'bar',
        },
        {
          title: 'foo b',
          author: 'bar 2',
        },
      ]);
    await request(app.getHttpServer())
      .get('/')
      .query({ search: 'bar 2' })
      .expect(200)
      .expect([
        {
          title: 'foo b',
          author: 'bar 2',
        }
      ]);
  });
});
