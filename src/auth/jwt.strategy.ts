import { Injectable, Inject } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaUserRepository } from 'src/users/repositories/prisma/prisma-users.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';

interface Payload {
  email: string;
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(PrismaUserRepository) private usersRepository: UsersRepository,
  ) {
    super({
      secretOrKey: '123',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate({ email }: Payload) {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new ForbiddenException('Sem permissão');
    }
    return user;
  }
}
