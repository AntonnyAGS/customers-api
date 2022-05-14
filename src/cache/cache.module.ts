import Redis from 'ioredis';
import { Module } from '@nestjs/common';
import { RedisClient } from './constants';
import { CacheService } from './cache.service';

@Module({
  providers: [
    {
      useFactory: () =>
        new Redis({
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        }),
      provide: RedisClient.DefaultClient,
    },
    CacheService,
  ],
  exports: [CacheService],
})
export class CacheModule {}
