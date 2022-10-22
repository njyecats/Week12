class Book {
  constructor(book) {
      this.book = book;
      this.titles = [];
  }
    }
 
class BookService {
   
static url = "https://6351b119dfe45bbd55c74e5f.mockapi.io/Promineo_tech_API/Book";    

  static getAllBooks() {
      return $.get(this.url);
  }

  static getBook(id) {
      return $.get(this.url + `/${id}`);
  }

  static createBook(book) {
           return $.ajax({
          url: this.url, 
          dataType: 'json',
          data: JSON.stringify(book),
          contentType: 'application/json',
          type: "POST"
      });
  }
  

  static deleteBook(id) {
    console.log(id);
      return $.ajax({
          url: `https://6351b119dfe45bbd55c74e5f.mockapi.io/Promineo_tech_API/Book/${id}`, 
          type: "DELETE"
      })
  }
}

class DOMManager {
  static books;

  static getAllBooks() {
      BookService.getAllBooks().then(books => this.render(books));
  }

  static createBook(name) {
      BookService.createBook(new Book(name))
          .then(() => {
              return BookService.getAllBooks();
          })
          .then((books) => this.render(books));
  }

  static deleteBook(id) {
      BookService.deleteBook(id)
          .then(() => {
              return BookService.getAllBooks();
          })
          .then((books) => this.render(books));
  }
     

      static deleteTitle(bookId, titleName) {
          for (let book of this.books) {
              if (book._id == bookId) {
                      book.titles = book.titles.filter(function(e) {
                          return e.name != titleName;
                      });
          }
      }
  }

  static render(books) {
      this.books = books;
      $("#app").empty();
      for(let book of books) {
        console.log(book.id)
          $("#app").prepend(
              `<div id="${book.id}" class="card text-white bg-dark mb-3">
                  <div class="card-header">
                      <h2>${book.book}</h2>
                      <button class="btn btn-danger" onclick="DOMManager.deleteBook('${book.id}')">Delete</button>
                  
                  
                      </div>
              </div>
          </div>
          <br>`
          );
         
      }
  }
}

$('#create-new-book').click(() => {
  DOMManager.createBook($('#new-book-name').val());
  $('#new-book-name').val('');
  console.log("new book name")
  console.log($('#new-book-name').val(''))
});

DOMManager.getAllBooks();