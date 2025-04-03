import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto, AdminLoginDTO } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminsService: AdminService) {}

  @Get()
  findAll() {
    return this.adminsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.adminsService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminsService.update(id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.adminsService.remove(id);
  }

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  @Post('login')
  login(@Body() loginAdminDto: AdminLoginDTO) {
    return this.adminsService.login(loginAdminDto);
  }
}

