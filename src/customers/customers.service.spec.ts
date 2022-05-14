import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { CacheService } from '../cache/cache.service';
import { CustomersService } from './customers.service';

describe('CustomersService', () => {
  let service: CustomersService;
  const authService = {
    verifyToken: jest.fn(() => Promise.resolve()),
  };
  const cacheService = {
    add: jest.fn(() => Promise.resolve()),
    get: jest.fn(() => Promise.resolve()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: AuthService,
          useValue: authService,
        },
        { provide: CacheService, useValue: cacheService },
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
});
