import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Customer } from './types/customer.type';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('customers')
@ApiBearerAuth()
@Controller('customers')
export class CustomersController {
  constructor(
    @Inject(CustomersService)
    private readonly customersService: CustomersService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Customer created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 502, description: 'SSO or Cache Unavailable' })
  create(@Body() dto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(dto);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ok' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @ApiResponse({ status: 502, description: 'SSO or Cache Unavailable' })
  getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<Customer> {
    return this.customersService.getById(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Customer updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  @ApiResponse({
    status: 409,
    description: 'Customer with new id already exists',
  })
  @ApiResponse({ status: 502, description: 'SSO or Cache Unavailable' })
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.customersService.update(id, dto);
  }
}
