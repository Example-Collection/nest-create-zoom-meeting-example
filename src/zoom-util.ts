import { ConfigService } from "@nestjs/config";

export function generateRedirectUrlFromReq(req: any, configSerivce: ConfigService): string {
    const apiDomain = configSerivce.get('apiDomain');
    const path = req.originalUrl.split('?')[0];
    return `${apiDomain}${path}`;
}