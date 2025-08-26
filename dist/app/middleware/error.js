"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerRoutes = exports.notFoundRoutes = void 0;
const express_1 = __importDefault(require("express"));
exports.notFoundRoutes = express_1.default.Router();
exports.errorHandlerRoutes = express_1.default.Router();
exports.notFoundRoutes.get('*', function notFound(req, res) {
    res.status(404).json({
        success: false,
        message: "Resource not found",
        data: null
    });
});
exports.errorHandlerRoutes.get('*', function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    if (err && err.name === 'ValidationError') {
        return res.sendStatus(400).json({ message: 'Validation failed', success: false, error: err });
    }
    if (err && err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ID', success: false, error: err });
    }
    res.status(status).json({ message: (err === null || err === void 0 ? void 0 : err.message) || 'Internal Server Error', success: false, error: err });
});
