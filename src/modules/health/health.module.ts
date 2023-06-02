import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { CacheHealthIndicator } from './custom/cache.health';
import { HealthController } from './health.controller';
import { CacheModule } from '../cache/cache.module';

@Module({
  imports: [TerminusModule, CacheModule],
  providers: [CacheHealthIndicator],
  controllers: [HealthController],
})
export class HealthModule {}
