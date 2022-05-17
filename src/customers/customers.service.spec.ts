import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from '../redis/redis.service';
import { CustomersService } from './customers.service';
import { Customer } from './models/customer';

type MockedRedis = {
  add: any;
  get: any;
  delete: any;
};

describe('CustomersService', () => {
  let service: CustomersService;
  let redisService: MockedRedis;

  beforeEach(async () => {
    redisService = {
      add: jest.fn(() => Promise.resolve()),
      get: jest.fn(() => Promise.resolve(new Customer())),
      delete: jest.fn(() => Promise.resolve()),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        { provide: RedisService, useValue: redisService },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add new customer', async () => {
    const result = await service.add({
      document: 435,
      name: 'MockedCustomer ',
    });

    expect(result).toBeDefined();
  });

  it('should get one customer', async () => {
    const result = await service.getOne('MockedCustomerId');

    expect(result).toBeDefined();
  });

  it('should throw not found exception if not found customer on cache', () => {
    redisService.get.mockReturnValue(null);

    const result = service.getOne('MockedCustomerId');

    expect(result).rejects.toThrowError(
      new NotFoundException(
        'Cannot found an customer with id: MockedCustomerId',
      ),
    );
  });

  it('should update an customer', async () => {
    const result = await service.update({
      id: 'MockedId',
      name: 'MockedName',
      document: 456,
    });

    expect(result).toBeDefined();
  });
});
