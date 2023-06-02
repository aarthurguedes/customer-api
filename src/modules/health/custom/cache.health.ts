import { Inject, Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from 'src/modules/cache/constants';

@Injectable()
export class CacheHealthIndicator extends HealthIndicator {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const pingResponse = await this.redisClient.ping();
    const status = pingResponse === 'PONG' ? 'up' : 'down';
    const isHealthy = status === 'up';
    const result = this.getStatus(key, isHealthy, { status });
    if (isHealthy) {
      return result;
    }
    throw new HealthCheckError('Cachecheck failed', result);
  }
}
