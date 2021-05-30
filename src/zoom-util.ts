import { ConfigService } from "@nestjs/config";

export function generateRedirectUrlFromReq(req: any, configSerivce: ConfigService): string {
    const apiDomain = configSerivce.get('apiDomain');
    return `${apiDomain}/${req.originalUrl}`;
}