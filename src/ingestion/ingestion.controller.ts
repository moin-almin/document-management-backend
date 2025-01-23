import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../role/role.entity';
import { IngestionService } from './ingestion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Ingestion Management')
@ApiBearerAuth()
@Controller('ingestion')
@UseGuards(JwtAuthGuard, RolesGuard) // Protect endpoints with roles
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @Post(':documentId/trigger')
  @ApiOperation({ summary: 'Trigger ingestion for a document' })
  @ApiParam({
    name: 'documentId',
    required: true,
    description: 'The ID of the document to ingest',
  })
  @Roles(RoleEnum.Admin, RoleEnum.Editor) // Allow only Admins and Editors
  triggerIngestion(@Param('documentId', ParseIntPipe) documentId: number) {
    return this.ingestionService.triggerIngestion(documentId);
  }

  @Post(':documentId/status')
  @ApiOperation({ summary: 'Get ingestion status for a document' })
  @ApiParam({
    name: 'documentId',
    required: true,
    description: 'The ID of the document to check status for',
  })
  @Roles(RoleEnum.Admin, RoleEnum.Editor, RoleEnum.Viewer) // All roles can view status
  getIngestionStatus(@Param('documentId', ParseIntPipe) documentId: number) {
    return this.ingestionService.getIngestionStatus(documentId);
  }
}
