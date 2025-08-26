import express, { Request, Response } from 'express';
import { BookModel, GENRES } from '../models/Book';

export const bookRoutes = express.Router();

bookRoutes.post('/create-book', 
    async function createBook(req: Request, res: Response){
    const book = await BookModel.create(req.body);

    res.status(201).json({
        success: true,
        message: "Book created successfully",
        data: book
    });
});

bookRoutes.get('/', 
    async function getBooks (req: Request, res: Response) {
    const {filter, sortBy = 'createdAt', sort = 'asc', limit = 10} = req.query as any;
    const query: any = {};
    if(filter && GENRES.includes(filter))query.genre = filter;
    const sortDir = sort === 'desc' ? -1 : 1;
    const books = await BookModel.find(query).sort({ [sortBy]: sortDir as 1 | -1 }).limit(Math.max(parseInt(limit), 1));

    res.status(200).json({
        success: true,
        message: "Books retrieved successfully",
        data: books
    });
});

bookRoutes.get('/:bookId', 
    async function getBookById(req: Request, res: Response) {
    const book = await BookModel.findById(req.params.bookId);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book not found",
            error: {name: 'NotFoundError'}
        });
    }

    res.status(200).json({
        success: true,
        message: "Single Book retrieved successfully",
        data: book
    });
});

bookRoutes.put('/:bookId', 
    async function updateBook (req: Request, res: Response) {
    const bookId = req.params.bookId;
    const updatedData = req.body;
    const book = await BookModel.findByIdAndUpdate(bookId, updatedData, { new: true, runValidators: true });
    
    if (!book) return res.status(404).json({
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

bookRoutes.delete('/:bookId',
    async function deleteBook (req: Request, res: Response) {
    const deleted = await BookModel.findByIdAndDelete(req.params.bookId);

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

export default bookRoutes;
