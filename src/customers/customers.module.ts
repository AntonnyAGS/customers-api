import { Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [AuthModule, RedisModule],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
