import { PartialType } from '@nestjs/mapped-types';
import { CreateClassgroupDto } from './create-classgroup.dto';

export class UpdateClassgroupDto extends PartialType(CreateClassgroupDto) {}
