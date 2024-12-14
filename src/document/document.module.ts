import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Document])], // Register the Document entity
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
