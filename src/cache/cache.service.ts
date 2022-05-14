import { Inject, Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import Redis from 'ioredis';
import { RedisClient } from './constants';

type AddType = 'customer';
type AddResponse = 'OK';

type ClassConstructor<T> = {
  new (...args: any[]): T;
};

interface GetOptions<T> {
  dataType: ClassConstructor<T>;
}

@Injectable()
export class CacheService {
  constructor(
    @Inject(RedisClient.DefaultClient)
    private readonly redis: Redis,
  ) {}

  async add(
    type: AddType,
    key: string,
    data: Record<string, unknown>,
  ): Promise<AddResponse> {
    const payload = instanceToPlain(data);

    return this.redis.set(`${type}:${key}`, JSON.stringify(payload));
  }

  async get<T>(
    type: AddType,
    key: string,
    { dataType }: GetOptions<T>,
  ): Promise<T> {
    const data = await this.redis.get(`${type}:${key}`);

    return plainToInstance(dataType, JSON.parse(data));
  }
}
