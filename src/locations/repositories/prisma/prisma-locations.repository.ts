import { Companies, Locations } from '@prisma/client';
import { prisma } from 'src/database/prisma';

import {
  LocationCreateData,
  LocationRepository,
  LocationUpdateData,
} from '../locations.repository';

export class PrismaLocationsRepository implements LocationRepository {
  async create({
    companyId,
    name,
    cep,
    street,
    number,
    district,
    city,
    state,
  }: LocationCreateData): Promise<void> {
    await prisma.locations.create({
      data: {
        name,
        cep,
        street,
        number,
        district,
        city,
        state,
        companyId,
      },
    });
  }
  async findById(id: number): Promise<Locations> {
    const location = await prisma.locations.findUnique({
      where: { id },
    });

    return location;
  }
  async findByCompanies(
    id: number,
  ): Promise<Companies & { locations: Locations[] }> {
    const locations = await prisma.companies.findUnique({
      where: { id: Number(id) },
      include: { locations: true },
    });

    return locations;
  }
  async update({
    name,
    cep,
    street,
    number,
    district,
    city,
    state,
    id,
  }: LocationUpdateData): Promise<Locations> {
    const updateLocation = await prisma.locations.update({
      where: { id },
      data: { name, cep, street, number, district, city, state },
    });

    return updateLocation;
  }
  async delete(id: number): Promise<void> {
    await prisma.locations.delete({
      where: { id },
    });
  }
}
