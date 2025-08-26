"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Book_1 = require("../models/Book");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post('/create-book', function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield Book_1.BookModel.create(req.body);
        res.status(201).json({
            success: true,
            message: "Book created successfully",
            data: book
        });
    });
});
exports.bookRoutes.get('/', function getBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = 10 } = req.query;
        const query = {};
        if (filter && Book_1.GENRES.includes(filter))
            query.genre = filter;
        const sortDir = sort === 'desc' ? -1 : 1;
        const books = yield Book_1.BookModel.find(query).sort({ [sortBy]: sortDir }).limit(Math.max(parseInt(limit), 1));
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: books
        });
    });
});
exports.bookRoutes.get('/:bookId', function getBookById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield Book_1.BookModel.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                error: { name: 'NotFoundError' }
            });
        }
        res.status(200).json({
            success: true,
            message: "Single Book retrieved successfully",
            data: book
        });
    });
});
exports.bookRoutes.put('/:bookId', function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookId = req.params.bookId;
        const updatedData = req.body;
        const book = yield Book_1.BookModel.findByIdAndUpdate(bookId, updatedData, { new: true, runValidators: true });
        if (!book)
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: { name: 'NotFoundError' }
            });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    });
});
exports.bookRoutes.delete('/:bookId', function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const deleted = yield Book_1.BookModel.findByIdAndDelete(req.params.bookId);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: "Book not found",
                error: { name: 'NotFoundError' }
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: null
        });
    });
});
exports.default = exports.bookRoutes;
