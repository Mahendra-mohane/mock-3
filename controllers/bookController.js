const Book = require('../models/book');

// Get all available books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get book details by ID
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get books by category and/or author
exports.getBooksByCategoryAndAuthor = async (req, res) => {
  const { category, author } = req.query;
  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (author) {
    filter.author = author;
  }

  try {
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Add a new book (Admin only)
exports.addBook = async (req, res) => {
  const { title, author, category, price, quantity } = req.body;

  try {
    const book = new Book({
      title,
      author,
      category,
      price,
      quantity
    });

    await book.save();

    res.status(201).json({ message: 'Book added successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update book by ID (Admin only)
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, category, price, quantity } = req.body;

  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, category, price, quantity },
      { new: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json({ message: 'Book updated successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete book by ID (Admin only)
exports.deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.status(200).json({ message: 'Book deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
