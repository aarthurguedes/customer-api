import { IsUUID } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCustomerDto extends CreateCustomerDto {
  @ApiProperty()
  @IsUUID(4)
  id: string;
}
