import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ZoomkrModule } from 'nest-zoomkr';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ZoomkrModule.forRoot(),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
