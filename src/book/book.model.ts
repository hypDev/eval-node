export class Book {
  constructor( data: Partial<Book> = {}){
    Object.assign(this, data);
  }
  title: string;
  author: string;
}

export const mockBook = (book: Partial<Book> = {}): Book => ({
  title: "Book Title "+Math.random(),
  author: "Book Author "+Math.random(),
  ...book,
});