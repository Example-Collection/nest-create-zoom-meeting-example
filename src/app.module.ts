import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZoomkrModule } from 'nest-zoomkr';
import { ConfigModule } from '@nestjs/config';
import { ZoomRequestMiddleware } from './zoom-request.middleware';

@Module({
  imports: [
    ZoomkrModule.forRoot(),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ZoomRequestMiddleware)
      .forRoutes('/new-meeting');
  }
}
