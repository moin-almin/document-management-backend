import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../role/role.entity';

@Controller('documents')
@UseGuards(RolesGuard) // Apply the guard to the entire controller
export class DocumentController {
  @Post()
  @Roles(RoleEnum.Admin, RoleEnum.Editor) // Only Admins and Editors can upload
  uploadDocument() {
    return 'Document uploaded!';
  }

  @Get()
  @Roles(RoleEnum.Viewer, RoleEnum.Editor, RoleEnum.Admin) // Everyone can read
  getDocuments() {
    return 'List of documents';
  }
}
