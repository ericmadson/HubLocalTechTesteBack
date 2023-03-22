import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// createUser.dto.ts
export class CreateCompanyDto {
  @IsNumber()
  @IsNotEmpty()
  readonly userId: number;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly website: string;
  @IsString()
  @IsNotEmpty()
  readonly cnpj: string;
}

// updateUser.dto.ts
export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsString()
  @IsOptional()
  readonly website: string;
  @IsString()
  @IsOptional()
  readonly cnpj: string;
}
