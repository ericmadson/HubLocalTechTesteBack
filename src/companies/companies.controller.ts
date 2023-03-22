import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { Companies } from '@prisma/client';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/companies.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('companies')
@UseGuards(AuthGuard('jwt'))
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Companies> {
    return this.companiesService.findOne(id);
  }

  @Post()
  async create(@Body() company: CreateCompanyDto): Promise<void> {
    return this.companiesService.create(company);
  }

  @Get('users/:id')
  async findAllFromUser(@Param('id') id: number): Promise<any> {
    return this.companiesService.findAllFromUser(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() company: UpdateCompanyDto,
  ): Promise<Companies> {
    return this.companiesService.update(id, company);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.companiesService.remove(id);
  }
}
