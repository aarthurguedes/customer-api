import { Module } from '@nestjs/common';
import { REDIS_CLIENT } from './constants';
import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
import { CacheRedisService } from './cache-redis.service';

@Module({
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        return new Redis({
          port: configService.get('CACHE_PORT'),
          host: configService.get('CACHE_HOST'),
        });
      },
      inject: [ConfigService],
    },
    CacheRedisService,
  ],
  exports: [CacheRedisService],
})
export class CacheModule {}
