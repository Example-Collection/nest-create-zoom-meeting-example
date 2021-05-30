import { Inject, Injectable } from '@nestjs/common';
import { ZOOMKR_MODULE } from 'nest-zoomkr';
import { Zoomkr } from 'zoomkr';

@Injectable()
export class AppService {
  requestAccessToken() {
    throw new Error('Method not implemented.');
  }

  constructor(
    @Inject(ZOOMKR_MODULE) private readonly zoomkr: Zoomkr,
  ) {
  }
  
  async createNewMeeting(payload: {
    zoomAccessToken: string;
  }) {
    const { zoomAccessToken } = payload;
    const meeting = await this.zoomkr.meeting.create({ param: { userId: 'me' }, query: undefined, body: {settings: {}}, accessToken: zoomAccessToken });
    return meeting;
  }
}
