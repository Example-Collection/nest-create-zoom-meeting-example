import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ZoomRedirectUri } from './zoom-redirect-uri.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/new-meeting')
  getNewMeeting(
    @Query('code') code: string,
    @ZoomRedirectUri() zoomRedirectUri: string,
  ): Promise<string> {
    return this.appService.createNewMeeting({ code, zoomRedirectUri });
  }
}
