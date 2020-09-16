import { Module } from '@nestjs/common';
import { BooksModule } from './book/book.module';

@Module({
  imports: [
    BooksModule,
  ]
})
export class AppModule {}
