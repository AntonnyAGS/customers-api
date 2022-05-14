import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { CacheModule } from './cache/cache.module';

@Module({
  imports: [CustomersModule, AuthModule, CacheModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
