import { Test, TestingModule } from '@nestjs/testing';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';

describe('IngestionController', () => {
  let controller: IngestionController;
  let ingestionService: IngestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [
        {
          provide: IngestionService,
          useValue: {
            triggerIngestion: jest.fn(),
            getIngestionStatus: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<IngestionController>(IngestionController);
    ingestionService = module.get<IngestionService>(IngestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(ingestionService).toBeDefined();
  });

  // Example Test Case
  it('should call triggerIngestion method', async () => {
    const mockResponse = { message: 'Ingestion started' };
    jest.spyOn(ingestionService, 'triggerIngestion').mockResolvedValue(mockResponse);

    const result = await controller.triggerIngestion(1);
    expect(ingestionService.triggerIngestion).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockResponse);
  });
});
