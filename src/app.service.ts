import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZOOMKR_MODULE } from 'nest-zoomkr';
import { Zoomkr } from 'zoomkr';

@Injectable()
export class AppService {
  requestAccessToken() {
    throw new Error('Method not implemented.');
  }
  private clientId: string;
  private clientSecret: string;

  constructor(
    @Inject(ZOOMKR_MODULE) private readonly zoomkr: Zoomkr,
    private readonly configService: ConfigService,
  ) {
    this.clientId = this.configService.get('clientID');
    this.clientSecret = this.configService.get('clientSecret');
  }
  
  async createNewMeeting(payload: {
    code: string;
    zoomRedirectUri: string;
  }) {
    const { code, zoomRedirectUri } = payload;

    const accessToken = await this.zoomkr.auth.getAccessToken({
      clientId: this.clientId,
      clientSecret: this.clientSecret,
    }, {
      grantType: 'authorization_code',
      code,
      redirectUri: zoomRedirectUri,
    });

    return accessToken;
  }
}
