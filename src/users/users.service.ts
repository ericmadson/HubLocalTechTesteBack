import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/users.dto';
import { PrismaUserRepository } from './repositories/prisma/prisma-users.repository';
import { UsersRepository } from './repositories/users.repository';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PrismaUserRepository)
    private usersRepository: UsersRepository,
  ) {}

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findById(Number(id));
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { name, email, password } = createUserDto;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new BadRequestException('email indisponível');
    }
    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({ name, email, password: passwordHash });
  }

  async update(
    id: number,
    { name, email, password }: UpdateUserDto,
  ): Promise<User> {
    const user = await this.usersRepository.findById(Number(id));

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const updatedUser = await this.usersRepository.update({
      id: Number(id),
      name,
      email,
      password,
    });

    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    const user = await this.usersRepository.findById(Number(id));
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.usersRepository.delete(Number(id));
  }
}
