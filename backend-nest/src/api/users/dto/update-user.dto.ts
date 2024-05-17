import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateUserBaseDto extends CreateUserDto {
  @IsNotEmpty()
  id: number;
}

export class UpdateUserDto extends PartialType(UpdateUserBaseDto) {}
