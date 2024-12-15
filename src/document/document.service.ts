import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Document } from './document.entity';
import { DocumentNotFoundException } from '../exceptions/document-not-found.exception';

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
    const document = await this.documentRepository.findOne({ where: { id } });
    if (!document) {
      throw new DocumentNotFoundException(id);
    }
    return document;
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

  async searchDocuments(query: string, field: string): Promise<Document[]> {
    const searchOptions = {};
    searchOptions[field] = Like(`%${query}%`);
    return this.documentRepository.find({ where: searchOptions });
  }
}
