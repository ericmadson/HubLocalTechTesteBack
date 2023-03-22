import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsNumber()
  @IsNotEmpty()
  readonly companyId: number;
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  readonly cep: string;
  @IsString()
  @IsNotEmpty()
  readonly street: string;
  @IsString()
  @IsNotEmpty()
  readonly number: string;
  @IsString()
  @IsNotEmpty()
  readonly district: string;
  @IsString()
  @IsNotEmpty()
  readonly city: string;
  @IsString()
  @IsNotEmpty()
  readonly state: string;
}

export class UpdateLocationDto {
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsString()
  @IsOptional()
  readonly cep: string;
  @IsString()
  @IsOptional()
  readonly street: string;
  @IsString()
  @IsOptional()
  readonly email: string;
  @IsString()
  @IsOptional()
  readonly number: string;
  @IsString()
  @IsOptional()
  readonly district: string;
  @IsString()
  @IsOptional()
  readonly city: string;
  @IsString()
  @IsOptional()
  readonly state: string;
}
