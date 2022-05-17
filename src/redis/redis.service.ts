import { BadGatewayException, Injectable } from '@nestjs/common';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import Redis from 'ioredis';

type Type = 'customer';
type AddResponse = 'OK';

type ClassConstructor<T> = {
  new (...args: any[]): T;
};

interface GetOptions<T> {
  dataType: ClassConstructor<T>;
}

export async function handler<Response>(fn: (...args: unknown[]) => Response) {
  try {
    const res = await fn();

    return res;
  } catch (err) {
    throw new BadGatewayException({
      message: 'Could not fetch cache',
      payload: err,
    });
  }
}

@Injectable()
export class RedisService {
  constructor(private readonly redis: Redis) {}

  async add(type: Type, key: string, data: unknown): Promise<AddResponse> {
    return handler(() => {
      const payload = instanceToPlain(data);

      return this.redis.set(`${type}:${key}`, JSON.stringify(payload));
    });
  }

  async delete(type: Type, key: string): Promise<void> {
    return handler(async () => {
      await this.redis.del(`${type}:${key}`);
    });
  }

  async get<T>(
    type: Type,
    key: string,
    { dataType }: GetOptions<T>,
  ): Promise<T> {
    return handler(async () => {
      const data = await this.redis.get(`${type}:${key}`);

      return plainToInstance(dataType, JSON.parse(data));
    });
  }
}
