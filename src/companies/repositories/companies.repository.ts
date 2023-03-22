import { Companies, Locations } from '@prisma/client';

export class CompanyCreateData {
  readonly userId: number;
  readonly name: string;
  readonly website: string;
  readonly cnpj: string;
}

export class CompanyUpdateData {
  readonly id: number;
  readonly name: string;
  readonly website: string;
  readonly cnpj: string;
}

export interface CompanyRepository {
  create: ({ userId, name, website, cnpj }: CompanyCreateData) => Promise<void>;
  findByCnpj: (email: string) => Promise<Companies | null>;
  findById: (id: number) => Promise<Companies | null>;
  findByUser: (id: number) => Promise<{
    companies: (Companies & { locations: Locations[] })[];
  } | null>;
  update: ({
    id,
    name,
    website,
    cnpj,
  }: CompanyUpdateData) => Promise<Companies>;
  delete: (id: number) => Promise<void>;
}
