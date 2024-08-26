// Book Class
class Book {
    #isbn; 

    constructor(title, author, isbn, availableCopies) {
        this.title = title;
        this.author = author;
        this.#isbn = this.#validateISBN(isbn) ? isbn : Book.generateISBN();
        this._availableCopies = availableCopies;
    }

    get availableCopies() {
        return this._availableCopies;
    }

    set availableCopies(value) {
        if (value >= 0) {
            this._availableCopies = value;
        } else {
            console.error('Available copies cannot be negative.');
        }
    }

    #validateISBN(isbn) {
        return typeof isbn === 'string' && isbn.length === 13;
    }

    static generateISBN() {
        return Math.random().toString().slice(2, 15); 
    }

    getISBN() {
        return this.#isbn; 
    }
}

class Library {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        } else {
            console.error('Only instances of Book can be added.');
        }
    }

    removeBook(isbn) {
        this.books = this.books.filter(book => book.getISBN() !== isbn); 
    }

    searchByTitle(title) {
        return this.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    }

    searchByAuthor(author) {
        return this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
    }

    displayAllBooks() {
        this.books.forEach(book => {
            console.log(`Title: ${book.title}, Author: ${book.author}, ISBN: ${book.getISBN()}, Available Copies: ${book.availableCopies}`);
        });
    }
}

// Example usage
const library = new Library();

const book1 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', '9780743273565', 5);
const book2 = new Book('To Kill a Mockingbird', 'Harper Lee', '9780060935467', 2);

library.addBook(book1);
library.addBook(book2);

console.log('All Books:');
library.displayAllBooks();

console.log('Search by Title "Great":');
console.log(library.searchByTitle('Great'));

console.log('Search by Author "Harper":');
console.log(library.searchByAuthor('Harper'));

book1.availableCopies = 6;
console.log('Updated Book 1 Copies:');
console.log(book1.availableCopies);

library.removeBook(book2.getISBN()); 
console.log('All Books after removal:');
library.displayAllBooks();
