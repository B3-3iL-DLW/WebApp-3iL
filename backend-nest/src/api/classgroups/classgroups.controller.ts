import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ClassgroupsService } from './classgroups.service';
import { CreateClassgroupDto } from './dto/create-classgroup.dto';

@Controller('api/classgroups')
export class ClassgroupsController {
  constructor(private readonly classgroupsService: ClassgroupsService) {}

  @Post()
  create(@Body() createClassgroupDto: CreateClassgroupDto) {
    return this.classgroupsService.create(createClassgroupDto);
  }

  @Get()
  findAll() {
    return this.classgroupsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.classgroupsService.findOne(+id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.classgroupsService.delete(+id);
  }
}
