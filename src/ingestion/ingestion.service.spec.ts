import { Test, TestingModule } from '@nestjs/testing';
import { IngestionService } from './ingestion.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { HttpException } from '@nestjs/common';
import { AxiosResponse } from 'axios';

describe('IngestionService', () => {
  let service: IngestionService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        IngestionService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<IngestionService>(IngestionService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should trigger ingestion successfully', async () => {
    const mockResponse: AxiosResponse = {
      data: { message: 'Ingestion started' },
      status: 201,
      statusText: 'Created',
      headers: {},
      config: {
        headers: undefined,
      },
    };
    jest.spyOn(httpService, 'post').mockReturnValue(of(mockResponse));

    const result = await service.triggerIngestion(1);
    expect(result).toEqual(mockResponse.data);
    expect(httpService.post).toHaveBeenCalledWith(
      'http://localhost:8000/ingest',
      { documentId: 1 },
    );
  });

  it('should handle errors when triggering ingestion', async () => {
    jest
      .spyOn(httpService, 'post')
      .mockReturnValue(throwError(() => new Error('Backend error')));

    await expect(service.triggerIngestion(1)).rejects.toThrow(HttpException);
  });

  it('should get ingestion status successfully', async () => {
    const mockResponse: AxiosResponse = {
      data: { documentId: 1, status: 'In Progress' },
      status: 201,
      statusText: 'Created',
      headers: {},
      config: {
        headers: undefined,
      },
    };
    jest.spyOn(httpService, 'get').mockReturnValue(of(mockResponse));

    const result = await service.getIngestionStatus(1);
    expect(result).toEqual(mockResponse.data);
    expect(httpService.get).toHaveBeenCalledWith(
      'http://localhost:8000/ingest/1/status',
    );
  });

  it('should handle errors when fetching ingestion status', async () => {
    jest
      .spyOn(httpService, 'get')
      .mockReturnValue(throwError(() => new Error('Backend error')));

    await expect(service.getIngestionStatus(1)).rejects.toThrow(HttpException);
  });
});
