import KoaRouter from 'koa-router'
import { Context } from 'koa';
import Koa from "koa";
import fs from "fs"

import handleRes from "./lib/handleRes"
let app = new Koa();

export function Get(url: string | RegExp, ...middleware: Array<KoaRouter.IMiddleware>) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.get(url, ...middleware, async (ctx: Context, next: () => Promise<any>) => {
                const res = await fn(ctx, next);
                handleRes(res, ctx, next);
            })
        }
    }
}

export function Post(url: string | RegExp, ...middleware: Array<KoaRouter.IMiddleware>) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.post(url, ...middleware, async (ctx: Context, next: () => Promise<any>) => {
                const res = await fn(ctx, next);
                handleRes(res, ctx, next);
            })
        }
    }
}

export function Put(url: string | RegExp, ...middleware: Array<KoaRouter.IMiddleware>) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.put(url, ...middleware, async (ctx: Context, next: () => Promise<any>) => {
                const res = await fn(ctx, next);
                handleRes(res, ctx, next);
            })
        }
    }
}

export function Patch(url: string | RegExp, ...middleware: Array<KoaRouter.IMiddleware>) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.patch(url, ...middleware, async (ctx: Context, next: () => Promise<any>) => {
                const res = await fn(ctx, next);
                handleRes(res, ctx, next);
            })
        }
    }
}

export function Delete(url: string | RegExp, ...middleware: Array<KoaRouter.IMiddleware>) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.delete(url, ...middleware, async (ctx: Context, next: () => Promise<any>) => {
                const res = await fn(ctx, next);
                handleRes(res, ctx, next);
            })
        }
    }
}

export function All(url: string | RegExp, ...middleware: Array<KoaRouter.IMiddleware>) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.all(url, ...middleware, async (ctx: Context, next: () => Promise<any>) => {
                const res = await fn(ctx, next);
                handleRes(res, ctx, next);
            })
        }
    }
}

export function Controller(prefix: string) {
    let router = new KoaRouter();
    if (prefix) {
        router.prefix(prefix)
    }
    app.use(router.routes());
    app.use(router.allowedMethods());
    return function (target: any) {
        let names = Object.getOwnPropertyNames(target.prototype);
        for (const name of names) {
            if (name !== "constructor") {
                let descriptor = Reflect.getOwnPropertyDescriptor(target.prototype, name) as TypedPropertyDescriptor<any>;
                let fn = descriptor.value;
                fn(router);
            }
        }
    }
}

/**
 * 加载路由
 * @param controllePath 
 */
export function getApp(controllePath: string): Koa {
    requireFile(controllePath);
    return app;
}



/**
 * 加载路由
 * @param controllePath 
 */
function requireFile(controllePath: string) {
    const arrDir = fs.readdirSync(controllePath);
    for (const f of arrDir) {
        let path = controllePath;
        path += `/${f}`;
        if (/\.js$/.test(f) || /\.ts$/.test(f)) {
            require(path);
        }
        else if (!/\.js\.map/.test(f)) {
            requireFile(path);
        }
    }
}