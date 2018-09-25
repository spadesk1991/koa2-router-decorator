import { Context } from "koa";
import { omit } from "lodash"
export default (res: any, ctx: Context, next: () => Promise<any>) => {
    if (res) { // 如果有返回
        const body = {
            err_code: 0
        }
        const type = typeof res;
        const types = ["string", "number", "boolean", "undefined"];
        // Object
        if (types.includes(type)) {
            Object.assign(body, { msg: res });
        } else if (type === "object") {
            if (res.err_code || res.err_code === 0) {
                Object.assign(body, { err_code: res.err_code });
                Object.assign(body, { data: omit(res, "err_code") });
            } else {
                Object.assign(body, { err_code: 0 });
                Object.assign(body, { data: res });
            }
        } else {
            ctx.status = 406;
            Object.assign(body, { msg: "返回类型错误" });
            ctx.body = body;
            return;
        }
        ctx.status = 200;
        ctx.body = body;
    }
}