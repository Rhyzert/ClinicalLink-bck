import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { SupervisorService } from './supervisor.service';
import { CreateSupervisorDto } from './dto/create-supervisor.dto';
import { UpdateSupervisorDto } from './dto/update-supervisor.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@UseGuards(AuthGuard)
@ApiBearerAuth()
@ApiTags('supervisor')
@Controller('supervisor')
export class SupervisorController {
  constructor(private readonly supervisorService: SupervisorService) {}

  @Post()
  create(@Body() createSupervisorDto: CreateSupervisorDto) {
    return this.supervisorService.create(createSupervisorDto);
  }

  @Get()
  findAll() {
    return this.supervisorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supervisorService.findOne(id);
  }

  @Get(':id/estagiarios')
  findByEstagiario(@Param('id') id: string) {
    return this.supervisorService.findEstagiarios(id);
  }

  @Get(':id/estagiariosid')
  findSupervisaoByIdEstagiario(@Param('id') id: string) {
    return this.supervisorService.findSupervisaoByIdEstagiario(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSupervisorDto: UpdateSupervisorDto,
  ) {
    return this.supervisorService.update(+id, updateSupervisorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supervisorService.remove(id);
  }
}
