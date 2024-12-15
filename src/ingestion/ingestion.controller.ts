import { Controller, Post, Param, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../role/role.entity';
import { IngestionService } from './ingestion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { ParseIntPipe } from '@nestjs/common';

@Controller('ingestion')
@UseGuards(JwtAuthGuard, RolesGuard) // Protect endpoints with roles
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post(':documentId/trigger')
  @Roles(RoleEnum.Admin, RoleEnum.Editor) // Allow only Admins and Editors
  triggerIngestion(@Param('documentId', ParseIntPipe) documentId: number) {
    return this.ingestionService.triggerIngestion(documentId);
  }

  @Post(':documentId/status')
  @Roles(RoleEnum.Admin, RoleEnum.Editor, RoleEnum.Viewer) // All roles can view status
  getIngestionStatus(@Param('documentId', ParseIntPipe) documentId: number) {
    return this.ingestionService.getIngestionStatus(documentId);
  }
}
