import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ZoomAccessToken } from './zoom-access-token.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/new-meeting')
  getNewMeeting(
    @ZoomAccessToken() zoomAccessToken: string,
  ): Promise<string> {
    return this.appService.createNewMeeting({ zoomAccessToken });
  }
}
