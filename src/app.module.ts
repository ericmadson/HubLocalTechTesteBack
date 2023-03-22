import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { LocationsModule } from './locations/locations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [CompaniesModule, LocationsModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
