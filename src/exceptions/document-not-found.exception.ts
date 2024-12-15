import { HttpException, HttpStatus } from '@nestjs/common';

export class DocumentNotFoundException extends HttpException {
  constructor(documentId: number) {
    super(`Document with ID ${documentId} not found`, HttpStatus.NOT_FOUND);
  }
}
