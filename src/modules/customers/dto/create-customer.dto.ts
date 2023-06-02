import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNumberString()
  document: string;

  @ApiProperty()
  @IsString()
  name: string;
}
