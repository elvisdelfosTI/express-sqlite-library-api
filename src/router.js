
const express = require('express');
const router = express.Router();

const booksRouter = require('./book/book.controller');
const categoriesRouter = require('./category/category.controller');

router.use('/books', booksRouter);
router.use('/categories', categoriesRouter);

module.exports = router;
