import express, { NextFunction, Request, Response } from 'express';

export const notFoundRoutes = express.Router();
export const errorHandlerRoutes = express.Router();

notFoundRoutes.get('*',
    function notFound (req: Request, res: Response) {
        res.status(404).json({
            success: false,
            message: "Resource not found",
            data: null
        })
    });

errorHandlerRoutes.get('*',
    function errorHandler (err: any, req: Request, res: Response, next: NextFunction) {
        const status = err.status || 500;
        if (err && err.name === 'ValidationError') {
            return res.sendStatus(400).json({ message: 'Validation failed', success: false, error: err });
        }
          if (err && err.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid ID', success: false, error: err });
        }
          res.status(status).json({ message: err?.message || 'Internal Server Error', success: false, error: err });
    }); 
