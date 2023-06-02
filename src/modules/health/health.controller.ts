import { Controller, Get } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { CacheHealthIndicator } from './custom/cache.health';
import { Public } from '../auth/decorator/public.decorator';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly cacheHealthIndicator: CacheHealthIndicator,
  ) {}

  @Get()
  @Public()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.cacheHealthIndicator.isHealthy('cache'),
    ]);
  }
}
