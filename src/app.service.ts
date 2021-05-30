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
  private redirectUri: string;

  constructor(
    @Inject(ZOOMKR_MODULE) private readonly zoomkr: Zoomkr,
    private readonly configService: ConfigService,
  ) {
    this.clientId = this.configService.get('clientID');
    this.clientSecret = this.configService.get('clientSecret');
    this.redirectUri = this.configService.get('redirectUri');
  }
  
  async createNewMeeting(payload: {
    res: any;
    code: string;
  }) {
    const { res, code } = payload;

    if(!code) res.status(200).redirect('https://zoom.us/oauth/authorize?client_id=z17AvS0ES3u3jQXh8HAsFA&response_type=code&redirect_uri=https%3A%2F%2Fapi.puroong.me');
    else {
      const accessToken = await this.zoomkr.auth.getAccessToken({
        clientId: this.clientId,
        clientSecret: this.clientSecret,
      }, {
        grantType: 'authorization_code',
        code,
        redirectUri: this.redirectUri,
      });

      return accessToken;
    }
  }
}
