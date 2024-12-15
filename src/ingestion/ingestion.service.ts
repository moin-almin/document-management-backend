import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class IngestionService {
  constructor(private readonly httpService: HttpService) {}

  async triggerIngestion(documentId: number): Promise<any> {
    const pythonBackendUrl =
      process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
    const ingestionUrl = `${pythonBackendUrl}/ingest`;

    const response = await this.httpService
      .post(ingestionUrl, { documentId })
      .toPromise();
    return response.data;
  }

  async getIngestionStatus(documentId: number): Promise<any> {
    const pythonBackendUrl =
      process.env.PYTHON_BACKEND_URL || 'http://localhost:8000';
    const statusUrl = `${pythonBackendUrl}/ingest/${documentId}/status`;

    const response = await this.httpService.get(statusUrl).toPromise();
    return response.data;
  }
}
