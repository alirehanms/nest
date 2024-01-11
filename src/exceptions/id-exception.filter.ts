import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(Error)
export class IdExceptionFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST; // You can set a different status code if needed

    response.status(status).json({
      message: 'Wrong ID',
      statusCode: status,
    });
  }
}
