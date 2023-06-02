import { BadGatewayException, Inject, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { REDIS_CLIENT } from '../constants';
import { Redis } from 'ioredis';

export class PingCacheMiddleware implements NestMiddleware {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const response = await this.redisClient.ping();
    response === 'PONG'
      ? next()
      : next(new BadGatewayException('Cache Unavailable'));
  }
}
