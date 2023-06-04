import { CreateCustomerDto } from '../../dto/create-customer.dto';
import { Customer } from '../../types/customer.type';

export const RANDOM_UUID = 'd4ae48dc-ee59-4e6b-85ce-f8d87fa59cd6';

export const CREATE_CUSTOMER_DTO_MOCK: CreateCustomerDto = {
  document: '12345',
  name: 'Test',
};

export const CUSTOMER_MOCK: Customer = {
  id: RANDOM_UUID,
  ...CREATE_CUSTOMER_DTO_MOCK,
};
