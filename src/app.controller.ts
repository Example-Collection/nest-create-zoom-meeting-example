import { Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) {}

  @Get('/new-meeting')
  getNewMeeting(
    @Res() res:any,
    @Query('code') code: string,
  ): Promise<string> {
    return this.appService.createNewMeeting({ res, code });
  }
}
