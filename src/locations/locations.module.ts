import { Module } from '@nestjs/common';
import { LocationsController } from './locations.controller';
import { LocationsService } from './locations.service';
import { PrismaLocationsRepository } from './repositories/prisma/prisma-locations.repository';
import { PrismaCompaniesRepository } from 'src/companies/repositories/prisma/prisma-companies.repository';

@Module({
  controllers: [LocationsController],
  providers: [
    LocationsService,
    PrismaLocationsRepository,
    PrismaCompaniesRepository,
  ],
})
export class LocationsModule {}
