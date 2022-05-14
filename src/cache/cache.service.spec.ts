import { Test, TestingModule } from '@nestjs/testing';
import { IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import { CacheService } from './cache.service';
import { RedisClient } from './constants';

type MockedRedis = {
  set: () => Promise<'OK'>;
  get: () => Promise<string>;
};

class MockedCacheValue {
  @IsString()
  readonly email: string;

  constructor(init?: MockedCacheValue) {
    this.email = init?.email;
  }
}

describe('CacheService', () => {
  let service: CacheService;
  const redis: MockedRedis = {
    set: jest.fn(() => Promise.resolve('OK')),
    get: jest.fn(() =>
      Promise.resolve(JSON.stringify({ email: 'mocked@mocked.com' })),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          useValue: redis,
          provide: RedisClient.DefaultClient,
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add data to cache', async () => {
    const result = await service.add('customer', randomUUID(), {
      email: 'mocked@mocked.com',
    });

    expect(result).toBe('OK');
  });

  it('should get data from cache', async () => {
    const result = await service.get('customer', randomUUID(), {
      dataType: MockedCacheValue,
    });

    expect(result).toBeDefined();
  });

  it('should return instance of class on get data from cache', async () => {
    const result = await service.get('customer', randomUUID(), {
      dataType: MockedCacheValue,
    });

    expect(result).toBeInstanceOf(MockedCacheValue);
  });
});
