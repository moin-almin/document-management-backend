import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../role/role.entity';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  @Roles(RoleEnum.Admin, RoleEnum.Editor) // Only Admins and Editors can create
  createDocument(
    @Body() body: { title: string; description: string; filePath: string },
  ) {
    return this.documentService.createDocument(
      body.title,
      body.description,
      body.filePath,
    );
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @Roles(RoleEnum.Admin, RoleEnum.Editor)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Save file details (path) to the database
    return { filePath: file.path };
  }

  @Get()
  @Roles(RoleEnum.Admin, RoleEnum.Editor, RoleEnum.Viewer) // All roles can view
  getDocuments() {
    return this.documentService.getDocuments();
  }

  @Get(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Editor, RoleEnum.Viewer)
  getDocumentById(@Param('id') id: number) {
    return this.documentService.getDocumentById(id);
  }

  @Put(':id')
  @Roles(RoleEnum.Admin, RoleEnum.Editor) // Only Admins and Editors can update
  updateDocument(@Param('id') id: number, @Body() body: Partial<Document>) {
    return this.documentService.updateDocument(id, body);
  }

  @Delete(':id')
  @Roles(RoleEnum.Admin) // Only Admins can delete
  deleteDocument(@Param('id') id: number) {
    return this.documentService.deleteDocument(id);
  }
}
