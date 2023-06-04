import { Test } from '@nestjs/testing';
import { CacheService } from 'src/modules/cache/interface/cache-service.interface';
import { CacheRedisService } from '../../cache/cache-redis.service';
import { CustomersService } from '../customers.service';
import { CREATE_CUSTOMER_DTO_MOCK, CUSTOMER_MOCK, RANDOM_UUID } from './mocks';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { Customer } from '../types/customer.type';

jest.mock('uuid', () => ({
  v4: () => RANDOM_UUID,
}));

describe('CustomersService', () => {
  let customersService: CustomersService;
  let cacheService: CacheService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CacheRedisService,
          useValue: {
            set: jest.fn(),
            get: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    customersService = moduleRef.get<CustomersService>(CustomersService);
    cacheService = moduleRef.get<CacheRedisService>(CacheRedisService);
  });

  describe('create', () => {
    it('should create a customer', async () => {
      const expectedKey = `customer:${RANDOM_UUID}`;

      const customer = await customersService.create(CREATE_CUSTOMER_DTO_MOCK);

      expect(cacheService.set).toHaveBeenCalledWith(
        expectedKey,
        JSON.stringify({ id: RANDOM_UUID, ...CREATE_CUSTOMER_DTO_MOCK }),
      );
      expect(customer.id).toBe(RANDOM_UUID);
      expect(customer.name).toBe(CREATE_CUSTOMER_DTO_MOCK.name);
      expect(customer.document).toBe(CREATE_CUSTOMER_DTO_MOCK.document);
    });
  });

  describe('getById', () => {
    it('should return a customer by id', async () => {
      const expectedKey = `customer:${RANDOM_UUID}`;

      jest
        .spyOn(cacheService, 'get')
        .mockResolvedValue(JSON.stringify(CUSTOMER_MOCK));

      const customer = await customersService.getById(RANDOM_UUID);

      expect(cacheService.get).toHaveBeenCalledWith(expectedKey);
      expect(customer).toEqual(CUSTOMER_MOCK);
    });

    it('should throw an exception if customer does not exist', async () => {
      await expect(customersService.getById(RANDOM_UUID)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should throw not found exception if customer does not exist', async () => {
      await expect(
        customersService.update(RANDOM_UUID, CUSTOMER_MOCK),
      ).rejects.toThrow(NotFoundException);
    });

    it('should throw conflict exception when id conflict occur', async () => {
      const newId = '123456789';

      jest
        .spyOn(cacheService, 'get')
        .mockResolvedValue(JSON.stringify({ ...CUSTOMER_MOCK, id: newId }));

      await expect(
        customersService.update(RANDOM_UUID, {
          ...CUSTOMER_MOCK,
          id: newId,
        }),
      ).rejects.toThrow(ConflictException);
      expect(cacheService.get).toHaveBeenCalledWith(`customer:${newId}`);
    });

    it('should delete cache when id is updated', async () => {
      const oldId = CUSTOMER_MOCK.id;
      const newId = '123456789';
      const oldKey = `customer:${oldId}`;

      jest
        .spyOn(cacheService, 'get')
        .mockResolvedValueOnce(JSON.stringify(CUSTOMER_MOCK));

      await customersService.update(oldId, { ...CUSTOMER_MOCK, id: newId });

      expect(cacheService.delete).toHaveBeenCalledWith(oldKey);
    });

    it('should update a customer', async () => {
      const updatedCustomer: Customer = {
        id: RANDOM_UUID,
        name: 'Updated',
        document: '54321',
      };

      jest
        .spyOn(cacheService, 'get')
        .mockResolvedValue(JSON.stringify(CUSTOMER_MOCK));

      const customer = await customersService.update(
        RANDOM_UUID,
        updatedCustomer,
      );

      expect(cacheService.set).toHaveBeenCalledWith(
        `customer:${RANDOM_UUID}`,
        JSON.stringify(updatedCustomer),
      );
      expect(customer).toEqual(updatedCustomer);
    });
  });
});
