import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Companies } from '@prisma/client';
import { PrismaUserRepository } from 'src/users/repositories/prisma/prisma-users.repository';
import { UsersRepository } from 'src/users/repositories/users.repository';
import { CreateCompanyDto, UpdateCompanyDto } from './dto/companies.dto';
import { Company } from './entities/company.entity';
import { CompanyRepository } from './repositories/companies.repository';
import { PrismaCompaniesRepository } from './repositories/prisma/prisma-companies.repository';

@Injectable()
export class CompaniesService {
  private readonly companies: Company[] = [];
  constructor(
    @Inject(PrismaCompaniesRepository)
    private companiesRepository: CompanyRepository,
    @Inject(PrismaUserRepository)
    private userRepository: UsersRepository,
  ) {}

  async findOne(id: number): Promise<Companies> {
    const company = await this.companiesRepository.findById(Number(id));
    if (!company) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return company;
  }

  async create({
    userId,
    cnpj,
    website,
    name,
  }: CreateCompanyDto): Promise<void> {
    const userExists = await this.userRepository.findById(userId);

    if (!userExists) {
      throw new NotFoundException('usuário não existe');
    }
    const companyExists = await this.companiesRepository.findByCnpj(cnpj);
    if (companyExists) {
      throw new BadRequestException('empresa já existe');
    }
    await this.companiesRepository.create({
      userId,
      cnpj,
      website,
      name,
    });
  }

  async findAllFromUser(id: number) {
    const userExists = await this.userRepository.findById(Number(id));

    if (!userExists) {
      throw new NotFoundException('usuário não existe');
    }
    const companies = await this.companiesRepository.findByUser(Number(id));
    return companies;
  }

  async update(
    id: number,
    { name, website, cnpj }: UpdateCompanyDto,
  ): Promise<Companies> {
    const company = await this.companiesRepository.findById(Number(id));

    if (!company) {
      throw new NotFoundException(`Company with id ${id} not found`);
    }

    const updatedCompany = await this.companiesRepository.update({
      id: Number(id),
      name,
      website,
      cnpj,
    });

    return updatedCompany;
  }

  async remove(id: number): Promise<void> {
    const user = await this.companiesRepository.findById(Number(id));
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    await this.companiesRepository.delete(Number(id));
  }
}
