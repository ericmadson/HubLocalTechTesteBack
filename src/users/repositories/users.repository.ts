import { User } from '@prisma/client';

export interface UsersCreateData {
  name: string;
  email: string;
  password: string;
}

export interface UsersUpdateData {
  id: number;
  name?: string;
  email?: string;
  password?: string;
}

export interface UsersRepository {
  create: ({ name, email, password }: UsersCreateData) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: number) => Promise<User | null>;
  update: ({ name, email, password, id }: UsersUpdateData) => Promise<User>;
  delete: (id: number) => Promise<void>;
}
