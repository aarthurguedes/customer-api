import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CacheModule } from '../cache/cache.module';
import { CustomersService } from './customers.service';

@Module({
  imports: [CacheModule],
  providers: [CustomersService],
  controllers: [CustomersController],
})
export class CustomersModule {}
