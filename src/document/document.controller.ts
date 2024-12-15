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
import { ApiTags, ApiBearerAuth, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Document Management')
@ApiBearerAuth()
@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentController {
  constructor(private documentService: DocumentService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a file and create a document' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary' },
        title: { type: 'string' },
        description: { type: 'string' },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Save files in the "uploads" folder
        filename: (req, file, callback) => {
          const fileExtName = extname(file.originalname); // Extract file extension
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          callback(null, `${randomName}${fileExtName}`); // Generate random name with extension
        },
      }),
    }),
  )
  @Roles(RoleEnum.Admin, RoleEnum.Editor) // Restrict to Admins and Editors
  async uploadAndCreateDocument(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: { title: string; description: string },
  ) {
    // Save document metadata to the database
    const newDocument = await this.documentService.createDocument(
      body.title,
      body.description,
      file.path,
    );

    return {
      message: 'File uploaded and document created successfully',
      document: newDocument,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all documents' })
  @Roles(RoleEnum.Admin, RoleEnum.Editor, RoleEnum.Viewer) // All roles can view
  getDocuments() {
    return this.documentService.getDocuments();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get document by id' })
  @Roles(RoleEnum.Admin, RoleEnum.Editor, RoleEnum.Viewer)
  getDocumentById(@Param('id') id: number) {
    return this.documentService.getDocumentById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update document metadata' })
  @Roles(RoleEnum.Admin, RoleEnum.Editor) // Only Admins and Editors can update
  updateDocument(@Param('id') id: number, @Body() body: Partial<Document>) {
    return this.documentService.updateDocument(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a document' })
  @Roles(RoleEnum.Admin) // Only Admins can delete
  deleteDocument(@Param('id') id: number) {
    return this.documentService.deleteDocument(id);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search documents by title or description' })
  @Roles(RoleEnum.Admin, RoleEnum.Editor, RoleEnum.Viewer) // All roles can search
  searchDocuments(
    @Query('query') query: string,
    @Query('field') field: string = 'title', // Default search field is title
  ) {
    return this.documentService.searchDocuments(query, field);
  }
}
