import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum RoleAdmin {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPER_ADMIN',
}

export class CreateAdminDto {
  @ApiProperty({ example: 'Ali' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'securePassword' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'ali@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'ADMIN' })
  @IsNotEmpty()
  @IsEnum(RoleAdmin)
  role: RoleAdmin;
}

export class AdminLoginDTO {
  @ApiProperty({ example: 'ali@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'yourPassword' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
