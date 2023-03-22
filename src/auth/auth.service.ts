import { Injectable, Inject } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaUserRepository } from 'src/users/repositories/prisma/prisma-users.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { UnauthorizedException } from '@nestjs/common/exceptions';

interface LoginUserDto {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaUserRepository) private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginUserDto) {
    const user = await this.usersRepository.findByEmail(email);
    const userId = user.id;
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciais inválidas');
    }
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, {
        secret: '123',
        expiresIn: '10m',
      }),
      userId,
    };
  }
}
