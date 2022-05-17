import { Test, TestingModule } from '@nestjs/testing';
import { IsString } from 'class-validator';
import { randomUUID } from 'crypto';
import { RedisService } from './redis.service';
import Redis from 'ioredis';
import { BadGatewayException, BadRequestException } from '@nestjs/common';

type MockedRedis = {
  set: () => Promise<'OK'>;
  get: () => Promise<string>;
  del: () => Promise<void>;
};

class MockedCacheValue {
  @IsString()
  readonly email: string;

  constructor(init?: MockedCacheValue) {
    this.email = init?.email;
  }
}

describe('RedisService', () => {
  let service: RedisService;
  let redis: MockedRedis;

  beforeEach(async () => {
    redis = {
      set: jest.fn(() => Promise.resolve('OK')),
      get: jest.fn(() =>
        Promise.resolve(JSON.stringify({ email: 'mocked@mocked.com' })),
      ),
      del: jest.fn(() => Promise.resolve()),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisService,
        {
          useValue: redis,
          provide: Redis,
        },
      ],
    }).compile();

    service = module.get<RedisService>(RedisService);
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

  it('should delete data from cache', async () => {
    const result = await service.delete('customer', randomUUID());

    expect(result).toBe(undefined);
  });

  it('should return instance of class on get data from cache', async () => {
    const result = await service.get('customer', randomUUID(), {
      dataType: MockedCacheValue,
    });

    expect(result).toBeInstanceOf(MockedCacheValue);
  });

  it('should throw bad gateway exception if redis throw error', async () => {
    jest
      .spyOn(redis, 'get')
      .mockImplementation(() => Promise.reject(new BadRequestException()));

    const result = service.get('customer', 'mockedKey', {
      dataType: MockedCacheValue,
    });

    expect(result).rejects.toThrow(
      new BadGatewayException('Could not fetch cache'),
    );
  });
});
