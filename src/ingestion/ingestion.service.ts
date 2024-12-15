import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class IngestionService {
  constructor(private readonly httpService: HttpService) {}

  async triggerIngestion(documentId: number): Promise<any> {
    const pythonBackendUrl =
      process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
    const ingestionUrl = `${pythonBackendUrl}/ingest`;

    try {
      const response = await lastValueFrom(
        this.httpService.post(ingestionUrl, { documentId }).pipe(
          catchError((error) => {
            throw new HttpException(
              `Failed to trigger ingestion: ${error.message}`,
              HttpStatus.BAD_GATEWAY,
            );
          }),
        ),
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        `Unable to trigger ingestion for document ID ${documentId}.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getIngestionStatus(documentId: number): Promise<any> {
    const pythonBackendUrl =
      process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
    const statusUrl = `${pythonBackendUrl}/ingest/${documentId}/status`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(statusUrl).pipe(
          catchError((error) => {
            throw new HttpException(
              `Failed to fetch ingestion status: ${error.message}`,
              HttpStatus.BAD_GATEWAY,
            );
          }),
        ),
      );

      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new HttpException(
        `Unable to fetch ingestion status for document ID ${documentId}.`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
