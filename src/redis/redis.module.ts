import Redis from 'ioredis';
import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';

@Module({
  providers: [
    {
      provide: Redis,
      useFactory: () =>
        new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        }),
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
