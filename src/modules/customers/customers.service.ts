import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CacheRedisService } from '../cache/cache-redis.service';
import { CacheService } from '../cache/interface/cache-service.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './types/customer.type';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CacheRedisService)
    private readonly redisService: CacheService,
  ) {}

  async create(data: CreateCustomerDto): Promise<Customer> {
    const id = uuidv4();
    const customer = {
      id,
      ...data,
    };
    const key = `customer:${id}`;
    await this.redisService.set(key, JSON.stringify(customer));
    return customer;
  }

  async getById(id: string): Promise<Customer> {
    return this.getCustomerOrThrow(id);
  }

  async update(id: string, data: Customer): Promise<Customer> {
    await this.getCustomerOrThrow(id);
    // This code snippet was implemented aiming to follow the project specification
    if (id !== data.id) {
      const customerWithNewId = await this.redisService.get(
        `customer:${data.id}`,
      );
      if (customerWithNewId)
        throw new ConflictException(
          `Customer with id ${data.id} already exists`,
        );
      await this.redisService.delete(`customer:${id}`);
    }
    await this.redisService.set(`customer:${data.id}`, JSON.stringify(data));
    return data;
  }

  private async getCustomerOrThrow(id: string): Promise<Customer> {
    const customer = await this.redisService.get(`customer:${id}`);
    if (!customer) throw new NotFoundException('Customer not found');
    return JSON.parse(customer);
  }
}
