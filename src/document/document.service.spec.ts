import { Test, TestingModule } from '@nestjs/testing';
import { DocumentService } from './document.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { Repository } from 'typeorm';

describe('DocumentService', () => {
  let service: DocumentService;
  let repository: Repository<Document>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentService,
        {
          provide: getRepositoryToken(Document),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DocumentService>(DocumentService);
    repository = module.get<Repository<Document>>(getRepositoryToken(Document));
  });

  it('should search documents by title', async () => {
    const mockDocuments: Document[] = [
      {
        id: 1,
        title: 'Test Document',
        description: 'A test document',
        filePath: 'uploads/test.pdf',
        createdAt: new Date('2024-12-15T12:00:00Z'),
        updatedAt: new Date('2024-12-15T12:00:00Z'),
      },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(mockDocuments);

    const result = await service.searchDocuments('Test', 'title');
    expect(result).toEqual(mockDocuments);
  });
});
