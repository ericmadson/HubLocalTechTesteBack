import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

// createUser.dto.ts
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

// updateUser.dto.ts
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly name: string;
  @IsString()
  @IsOptional()
  readonly email: string;
  @IsString()
  @IsOptional()
  readonly password: string;
}
