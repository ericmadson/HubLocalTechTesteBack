import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaUserRepository } from 'src/users/repositories/prisma/prisma-users.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaUserRepository, JwtService, JwtStrategy],
  imports: [
    JwtModule.register({ secret: '123', signOptions: { expiresIn: 5 } }),
  ],
})
export class AuthModule {}
