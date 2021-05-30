import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZOOMKR_MODULE } from 'nest-zoomkr';
import { Zoomkr } from 'zoomkr';

@Injectable()
export class AppService {
  requestAccessToken() {
    throw new Error('Method not implemented.');
  }

  constructor(
    @Inject(ZOOMKR_MODULE) private readonly zoomkr: Zoomkr,
    private readonly configService: ConfigService,
  ) {
  }
  
  async createNewMeeting(payload: {
    zoomAccessToken: string;
  }) {
    const { zoomAccessToken } = payload;

    return zoomAccessToken;
  }
}
