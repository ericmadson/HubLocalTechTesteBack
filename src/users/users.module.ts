import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaUserRepository } from './repositories/prisma/prisma-users.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaUserRepository],
  exports: [PrismaUserRepository],
})
export class UsersModule {}
