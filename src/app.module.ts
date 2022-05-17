import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [RedisModule, AuthModule, CustomersModule],
})
export class AppModule {}
