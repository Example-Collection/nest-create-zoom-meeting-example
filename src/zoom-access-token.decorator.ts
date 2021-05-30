import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ZoomAccessToken = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        return req.zoomAccessToken;
    }
)