import { Test, TestingModule } from '@nestjs/testing';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';

describe('DocumentController', () => {
  let controller: DocumentController;
  let documentService: DocumentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentController],
      providers: [
        {
          provide: DocumentService,
          useValue: {
            createDocument: jest.fn(),
            getDocuments: jest.fn(),
            deleteDocument: jest.fn(),
            getDocumentById: jest.fn(),
            updateDocument: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<DocumentController>(DocumentController);
    documentService = module.get<DocumentService>(DocumentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(documentService).toBeDefined();
  });

  // Example Test Case
  it('should call getDocuments method', async () => {
    jest.spyOn(documentService, 'getDocuments').mockResolvedValue([]);
    const result = await controller.getDocuments();
    expect(documentService.getDocuments).toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
