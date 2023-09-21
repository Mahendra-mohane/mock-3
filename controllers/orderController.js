const Order = require('../models/order');
const Book = require('../models/book');

// Place an order
exports.placeOrder = async (req, res) => {
  const { user, books, totalAmount } = req.body;

  try {
    const order = new Order({
      user,
      books,
      totalAmount
    });

    // Reduce the quantity of each ordered book
    for (const bookId of books) {
      const book = await Book.findById(bookId);
      if (!book) {
        return res.status(404).json({ message: `Book with ID ${bookId} not found.` });
      }

      if (book.quantity <= 0) {
        return res.status(400).json({ message: `Book with ID ${bookId} is out of stock.` });
      }

      book.quantity--;
      await book.save();
    }

    await order.save();

    res.status(201).json({ message: 'Order placed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get all orders (Admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'name email').populate('books', 'title author');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
