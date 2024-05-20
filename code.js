const myLibrary = [];

        // Book constructor
        function Book(title, author, pages, read) {
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }

        // Toggle read status method
        Book.prototype.toggleReadStatus = function() {
            this.read = !this.read;
        };

        // Function to add a book to the library
        function addBookToLibrary(title, author, pages, read) {
            const newBook = new Book(title, author, pages, read);
            myLibrary.push(newBook);
            displayBooks(); // Refresh the display
        }

        // Function to display books
        function displayBooks() {
            const bookContainer = document.getElementById('book-container');
            bookContainer.innerHTML = ''; // Clear the container first

            myLibrary.forEach((book, index) => {
                // Create a card for each book
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';
                bookCard.setAttribute('data-index', index);

                // Add book details to the card
                bookCard.innerHTML = `
                    <h2>${book.title}</h2>
                    <h3>${book.author}</h3>
                    <p>${book.pages} pages</p>
                    <p>Read: ${book.read ? 'Yes' : 'No'}</p>
                    <button class="toggle-read-button" onclick="toggleReadStatus(${index})">Toggle Read</button>
                    <button class="remove-button" onclick="removeBookFromLibrary(${index})">Remove</button>
                `;

                // Append the card to the container
                bookContainer.appendChild(bookCard);
            });
        }

        // Function to remove a book from the library
        function removeBookFromLibrary(index) {
            myLibrary.splice(index, 1);
            displayBooks();
        }

        // Function to toggle the read status of a book
        function toggleReadStatus(index) {
            myLibrary[index].toggleReadStatus();
            displayBooks();
        }

        // Handle form submission
        document.getElementById('book-form').addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way

            // Get the input values
            const title = document.getElementById('title').value;
            const author = document.getElementById('author').value;
            const pages = document.getElementById('pages').value;
            const read = document.getElementById('read').checked;

            // Add the new book to the library
            addBookToLibrary(title, author, pages, read);

            // Clear the form
            document.getElementById('book-form').reset();

            // Close the modal
            toggleModal();
        });

        // Toggle modal visibility
        function toggleModal() {
            const modal = document.getElementById('modal');
            modal.classList.toggle('show');
        }

        // Manually add a few books for initial display
        addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 281, true);
        addBookToLibrary('1984', 'George Orwell', 328, false);
        addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);

