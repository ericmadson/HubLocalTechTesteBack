import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Locations } from '@prisma/client';
import { CreateLocationDto, UpdateLocationDto } from './dto/locations.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocationsService } from './locations.service';

@Controller('locations')
@UseGuards(AuthGuard('jwt'))
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Locations> {
    return this.locationsService.findOne(id);
  }

  @Post()
  async create(@Body() company: CreateLocationDto): Promise<void> {
    return this.locationsService.create(company);
  }

  @Get('companies/:id')
  async findAllFromUser(@Param('id') id: number): Promise<any> {
    return this.locationsService.findAllFromCompany(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() company: UpdateLocationDto,
  ): Promise<Locations> {
    return this.locationsService.update(id, company);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.locationsService.remove(id);
  }
}
