import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
  ) {}

  async createDocument(
    title: string,
    description: string,
    filePath: string,
  ): Promise<Document> {
    const document = this.documentRepository.create({
      title,
      description,
      filePath,
    });
    return this.documentRepository.save(document);
  }

  async getDocuments(): Promise<Document[]> {
    return this.documentRepository.find();
  }

  async getDocumentById(id: number): Promise<Document> {
    return this.documentRepository.findOne({ where: { id } });
  }

  async updateDocument(
    id: number,
    updateData: Partial<Document>,
  ): Promise<Document> {
    await this.documentRepository.update(id, updateData);
    return this.documentRepository.findOne({ where: { id } });
  }

  async deleteDocument(id: number): Promise<void> {
    await this.documentRepository.delete(id);
  }
}
