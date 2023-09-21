const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
router.get('/books', bookController.getBooksByCategoryAndAuthor);
router.post('/books', authMiddleware, bookController.addBook);
router.put('/books/:id', authMiddleware, bookController.updateBook);
router.delete('/books/:id', authMiddleware, bookController.deleteBook);

module.exports = router;
