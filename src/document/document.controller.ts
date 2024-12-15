import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../role/role.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Save files in the "uploads" folder
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname); // Extract the file extension
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${fileExtName}`); // Generate a random name with the extension
        },
      }),
    }),
  )
  @Roles(RoleEnum.Admin, RoleEnum.Editor)
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      originalName: file.originalname,
      mimeType: file.mimetype,
      size: file.size,
      filePath: file.path,
    };
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

  @Get('search')
  @Roles(RoleEnum.Admin, RoleEnum.Editor, RoleEnum.Viewer) // All roles can search
  searchDocuments(
    @Query('query') query: string,
    @Query('field') field: string = 'title', // Default search field is title
  ) {
    return this.documentService.searchDocuments(query, field);
  }
}
