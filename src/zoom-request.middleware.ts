import { Inject, Injectable, InternalServerErrorException, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZOOMKR_MODULE } from 'nest-zoomkr';
import { Zoomkr } from 'zoomkr';
import { generateRedirectUrlFromReq } from './zoom-util';

@Injectable()
export class ZoomRequestMiddleware implements NestMiddleware {
  private clientId: string;
  private clientSecret: string;

  constructor(
    @Inject(ZOOMKR_MODULE) private readonly zoomkr: Zoomkr,
    private readonly configService: ConfigService,
  ) {
    this.clientId = this.configService.get('clientID');
    this.clientSecret = this.configService.get('clientSecret');
  }

  async use(req: any, res: any, next: () => void) {
    const redirectUri = generateRedirectUrlFromReq(req, this.configService);
    if(req.query.code === undefined) res.status(200).redirect(`https://zoom.us/oauth/authorize?client_id=${this.clientId}&response_type=code&redirect_uri=${redirectUri}`)
    else {
      try {
        const accessToken = await this.zoomkr.auth.getAccessToken({
          clientId: this.clientId,
          clientSecret: this.clientSecret,
        }, {
          grantType: 'authorization_code',
          code: req.query.code,
          redirectUri,
        });

        req.zoomAccessToken = accessToken;
      } catch(err) {
        throw new InternalServerErrorException(err);
      }
      next();
    }
  }
}
