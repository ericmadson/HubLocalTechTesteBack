import { User } from '@prisma/client';
import { prisma } from 'src/database/prisma';

import {
  UsersCreateData,
  UsersRepository,
  UsersUpdateData,
} from '../users.repository';

export class PrismaUserRepository implements UsersRepository {
  async create({ name, email, password }: UsersCreateData): Promise<void> {
    await prisma.user.create({
      data: { name, email, password },
    });
  }
  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    return user;
  }
  async findById(id: number): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    return user;
  }
  async update({ name, email, password, id }: UsersUpdateData): Promise<User> {
    const updateUser = await prisma.user.update({
      where: { id },
      data: { name, email, password },
    });

    return updateUser;
  }
  async delete(id: number): Promise<void> {
    await prisma.user.delete({
      where: { id },
    });
  }
}
