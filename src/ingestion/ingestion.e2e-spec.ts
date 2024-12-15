import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { AppModule } from '../app.module';

describe('IngestionController (e2e)', () => {
  let app: INestApplication;
  let httpService: HttpService;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HttpService)
      .useValue({
        post: jest.fn(),
        get: jest.fn(),
      })
      .compile();

    app = moduleRef.createNestApplication();
    httpService = moduleRef.get<HttpService>(HttpService);
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ingestion/:documentId/trigger (POST)', async () => {
    jest.spyOn(httpService, 'post').mockReturnValue(
      of({
        data: { message: 'Ingestion started' },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {
          headers: undefined,
        },
      }),
    );

    return request(app.getHttpServer())
      .post('/ingestion/1/trigger')
      .set('Authorization', `Bearer <VALID_TOKEN>`)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual({ message: 'Ingestion started' });
      });
  });

  it('/ingestion/:documentId/status (GET)', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: { documentId: 1, status: 'In Progress' },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {
          headers: undefined,
        },
      }),
    );

    return request(app.getHttpServer())
      .get('/ingestion/1/status')
      .set('Authorization', `Bearer <VALID_TOKEN>`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          documentId: 1,
          status: 'In Progress',
        });
      });
  });

  it('/ingestion/:documentId/trigger (POST) - Backend Error', async () => {
    jest.spyOn(httpService, 'post').mockImplementation(() => {
      throw new Error('Backend error');
    });

    return request(app.getHttpServer())
      .post('/ingestion/1/trigger')
      .set('Authorization', `Bearer <VALID_TOKEN>`)
      .expect(502)
      .expect((res) => {
        expect(res.body).toHaveProperty(
          'message',
          'Failed to trigger ingestion',
        );
      });
  });

  it('/ingestion/:documentId/status (GET) - Not Found', async () => {
    jest.spyOn(httpService, 'get').mockReturnValue(
      of({
        data: { documentId: 1, status: 'In Progress' },
        status: 201,
        statusText: 'Created',
        headers: {},
        config: {
          headers: undefined,
        },
      }),
    );
    return request(app.getHttpServer())
      .get('/ingestion/999/status')
      .set('Authorization', `Bearer <VALID_TOKEN>`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual({
          documentId: 999,
          status: 'Not Found',
        });
      });
  });
});
