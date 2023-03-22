import { Module } from '@nestjs/common';
import { PrismaUserRepository } from 'src/users/repositories/prisma/prisma-users.repository';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { PrismaCompaniesRepository } from './repositories/prisma/prisma-companies.repository';

@Module({
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    PrismaCompaniesRepository,
    PrismaUserRepository,
  ],
})
export class CompaniesModule {}
