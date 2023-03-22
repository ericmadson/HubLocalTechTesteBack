import { Locations, Companies } from '@prisma/client';

export class LocationCreateData {
  readonly companyId: number;
  readonly name: string;
  readonly cep: string;
  readonly street: string;
  readonly number: string;
  readonly district: string;
  readonly city: string;
  readonly state: string;
}

export class LocationUpdateData {
  readonly id: number;
  readonly name: string;
  readonly cep: string;
  readonly street: string;
  readonly number: string;
  readonly district: string;
  readonly city: string;
  readonly state: string;
}

export interface LocationRepository {
  create: ({
    companyId,
    name,
    cep,
    street,
    number,
    district,
    city,
    state,
  }: LocationCreateData) => Promise<void>;
  findById: (id: number) => Promise<Locations | null>;
  findByCompanies: (
    id: number,
  ) => Promise<(Companies & { locations: Locations[] }) | null>;
  update: ({
    name,
    cep,
    street,
    number,
    district,
    city,
    state,
  }: LocationUpdateData) => Promise<Locations>;
  delete: (id: number) => Promise<void>;
}
