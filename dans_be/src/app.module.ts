/* eslint-disable lines-around-comment */
import type { MiddlewareConsumer } from '@nestjs/common';
import { Global, Inject, Module, RequestMethod } from '@nestjs/common';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { configService } from './@core/config';
import { ResponseMiddleware } from './@core/middleware';
import { LoggerService } from './@core/logger/logger.service';
import { Seeder } from './@core/seeds/seeds.service';
import { UserEntity } from './@model/user.entity';
import { JobsModule } from './jobs/jobs.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([UserEntity]),
    ConfigModule.forRoot({ isGlobal: true }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      ...configService.getRedisConfig(),
    }),
    AuthModule,
    UserModule,
    JobsModule,
  ],
  controllers: [AppController],
  providers: [Seeder, LoggerService],
})
export class AppModule {
  constructor(@Inject(CACHE_MANAGER) cacheManager) {
    try {
      const client = cacheManager.store.getClient();

      client.on('error', (error) => {
        console.info(`Redis error: ${error}`);
      });

      client.on('end', () => {
        console.info('Redis connection ended');
      });

      client.on('reconnecting', () => {
        console.info('Redis is reconnecting');
      });
    } catch (error) {
      console.error(`Error while initializing Redis connection: ${error}`);
    }
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ResponseMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
