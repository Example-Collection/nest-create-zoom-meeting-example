import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ZOOMKR_MODULE } from 'nest-zoomkr';
import { Zoomkr } from 'zoomkr';
import { generateRedirectUrlFromReq } from './zoom-util';

@Injectable()
export class ZoomRequestMiddleware implements NestMiddleware {
  constructor(
    @Inject(ZOOMKR_MODULE) private readonly zoomkr: Zoomkr,
    private readonly configSerivce: ConfigService,
  ) {}

  use(req: any, res: any, next: () => void) {
    const redirectUri = generateRedirectUrlFromReq(req, this.configSerivce);
    const clientId = this.configSerivce.get('clientID');
    if(req.query.code === undefined) res.status(200).redirect(`https://zoom.us/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`)
    req.zoomRedirectUri = redirectUri;
    next();
  }
}
