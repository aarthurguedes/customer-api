import { IsNumberString, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNumberString()
  document: string;

  @IsString()
  name: string;
}
