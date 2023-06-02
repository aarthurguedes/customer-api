import { Inject, Injectable } from '@nestjs/common';
import { CacheService } from './interface/cache-service.interface';
import { REDIS_CLIENT } from './constants';
import { Redis } from 'ioredis';

@Injectable()
export class CacheRedisService implements CacheService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  async set(key: string, value: string): Promise<void> {
    this.redisClient.set(key, value);
  }

  get(key: string): Promise<string> {
    return this.redisClient.get(key);
  }

  async delete(key: string): Promise<void> {
    this.redisClient.del(key);
  }
}
