import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ZoomRedirectUri = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.zoomRedirectUri;
    }
)