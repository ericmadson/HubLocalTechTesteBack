import { Companies, Locations } from '@prisma/client';
import { prisma } from 'src/database/prisma';

import {
  CompanyCreateData,
  CompanyRepository,
  CompanyUpdateData,
} from '../companies.repository';

export class PrismaCompaniesRepository implements CompanyRepository {
  async create({
    userId,
    name,
    website,
    cnpj,
  }: CompanyCreateData): Promise<void> {
    await prisma.companies.create({
      data: { name: name, website: website, cnpj: cnpj, userId: userId },
    });
  }
  async findByCnpj(cnpj: string): Promise<Companies> {
    const companies = await prisma.companies.findUnique({
      where: { cnpj },
    });

    return companies;
  }
  async findById(id: number): Promise<Companies> {
    const companies = await prisma.companies.findUnique({
      where: { id },
    });

    return companies;
  }
  async findByUser(
    id: number,
  ): Promise<{ companies: (Companies & { locations: Locations[] })[] }> {
    const companies = await prisma.user.findUnique({
      where: { id },
      include: { companies: { include: { locations: true } } },
    });

    return companies;
  }
  async update({
    id,
    name,
    website,
    cnpj,
  }: CompanyUpdateData): Promise<Companies> {
    const updateCompanies = await prisma.companies.update({
      where: { id },
      data: { name, website, cnpj },
    });

    return updateCompanies;
  }
  async delete(id: number): Promise<void> {
    await prisma.companies.delete({
      where: { id },
    });
  }
}
