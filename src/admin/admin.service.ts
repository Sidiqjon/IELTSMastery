import { BadRequestException, ConflictException, Injectable, UnauthorizedException,} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateAdminDto, AdminLoginDTO } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    try {
      let data = await this.prisma.admin.findMany();
      if (data.length === 0) {
        return new BadRequestException('Admins not found!');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async getOne(id: number) {
    try {
      let data = await this.prisma.admin.findUnique({ where: { id } });
      if (!data) {
        return new BadRequestException('Admin not found!');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: number, updateAdminDto: UpdateAdminDto) {
    try {
      let admin = await this.prisma.admin.findUnique({ where: { id } });
      if (!admin) {
        return new BadRequestException('Admin not found!');
      }

      let data = await this.prisma.admin.update({
        where: { id },
        data: updateAdminDto,
      });

      return { data }
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      let admin = await this.prisma.admin.findUnique({ where: { id } });
      if (!admin) {
        return new BadRequestException('Admin not found!');
      }

      let data = await this.prisma.admin.delete({ where: { id }});

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async create(createAdminDto: CreateAdminDto) {
    let { email, password } = createAdminDto;
    try {
      let admin = await this.prisma.admin.findUnique({ where: { email } });
      if (admin) {
        return new ConflictException('Admin already exists!');
      }

      let hashedPwd = bcrypt.hashSync(password, 5);
      let newData = await this.prisma.admin.create({
        data: { ...createAdminDto, password: hashedPwd },
      });

      return { data: newData };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async login(AdminLoginDTO: AdminLoginDTO) {
    let { email, password } = AdminLoginDTO;
    try {
      let admin = await this.prisma.admin.findUnique({ where: { email } });
      if (!admin) {
        return new UnauthorizedException('Password or email is wrong!');
      }

      let checkPwd = bcrypt.compareSync(password, admin.password);
      if (!checkPwd) {
        return new BadRequestException('Invalid password!');
      }

      return { message: 'Login success', data: admin };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

}
