import { IsNotEmpty } from 'class-validator';

export class CreateClassgroupDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  file: string;
}
