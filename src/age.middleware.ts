// age.middleware.ts

import { Injectable, NestMiddleware, HttpStatus } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AgeMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requiredAge = 18; 
    const userAgeHeader = req.headers['user-age'];
    if (!userAgeHeader) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User age not provided in headers' });
    }
    const userAge = parseInt(userAgeHeader as string, 10);
    if (userAge >= requiredAge) {
      next();
    } else {
     
      return res
        .status(HttpStatus.FORBIDDEN)
        .json({ message: 'User age is below the required minimum' });
    }
  }
}
