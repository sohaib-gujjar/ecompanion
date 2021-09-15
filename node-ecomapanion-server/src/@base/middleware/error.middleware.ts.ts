import { NextFunction, Request, Response } from 'express';
import HttpException from '../exception/HttpException';

export default function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  response
    .status(error.status || 500)
    .send(error.message || 'Internal server error');
}