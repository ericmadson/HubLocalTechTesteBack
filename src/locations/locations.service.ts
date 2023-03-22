import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Locations } from '@prisma/client';
import { CompanyRepository } from 'src/companies/repositories/companies.repository';
import { PrismaCompaniesRepository } from 'src/companies/repositories/prisma/prisma-companies.repository';
import { CreateLocationDto, UpdateLocationDto } from './dto/locations.dto';
import { LocationRepository } from './repositories/locations.repository';
import { PrismaLocationsRepository } from './repositories/prisma/prisma-locations.repository';

@Injectable()
export class LocationsService {
  private locations: Location[] = [];
  constructor(
    @Inject(PrismaLocationsRepository)
    private locationRepository: LocationRepository,
    @Inject(PrismaCompaniesRepository)
    private companiesRepository: CompanyRepository,
  ) {}

  async findOne(id: number): Promise<Locations> {
    const company = await this.locationRepository.findById(Number(id));
    if (!company) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }
    return company;
  }

  async create({
    name,
    companyId,
    cep,
    city,
    district,
    number,
    state,
    street,
  }: CreateLocationDto): Promise<void> {
    const companyExists = await this.companiesRepository.findById(companyId);
    if (!companyExists) {
      throw new NotFoundException('empresa não existe');
    }

    await this.locationRepository.create({
      name,
      companyId,
      cep,
      city,
      district,
      number,
      state,
      street,
    });
  }

  async findAllFromCompany(id: number) {
    const company = await this.companiesRepository.findById(Number(id));

    if (!company) {
      throw new NotFoundException('empresa não existe');
    }
    const locations = await this.locationRepository.findByCompanies(Number(id));
    return locations;
  }

  async update(
    id: number,
    { name, cep, city, district, number, state, street }: UpdateLocationDto,
  ): Promise<Locations> {
    const location = await this.locationRepository.findById(Number(id));

    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }

    const updatedCompany = await this.locationRepository.update({
      id: Number(id),
      name,
      cep,
      city,
      district,
      number,
      state,
      street,
    });

    return updatedCompany;
  }

  async remove(id: number): Promise<void> {
    const location = await this.locationRepository.findById(Number(id));
    if (!location) {
      throw new NotFoundException(`Location with id ${id} not found`);
    }
    await this.locationRepository.delete(Number(id));
  }
}
