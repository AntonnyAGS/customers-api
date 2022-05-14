import { CacheModule, Module } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomersController } from './customers.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule, CacheModule],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
