import KoaRouter from 'koa-router'
import { Context } from 'koa';
import Koa from "koa";
// import handleRes from "./handleRes"

let app = new Koa();

export function Get(url: string | RegExp) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.get(url, async (ctx: Context, next: () => Promise<any>) => {
                // await handleRes(ctx, next, fn(ctx, next))
                await fn(ctx, next);
            })
        }
    }
}

export function Post(url: string | RegExp) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.post(url, async (ctx: Context, next: () => Promise<any>) => {
                const a = await fn(ctx, next)
                console.log(a);
            })
        }
    }
}

export function Put(url: string | RegExp) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.put(url, async (ctx: Context, next: () => Promise<any>) => {
                await fn(ctx, next)
            })
        }
    }
}

export function Patch(url: string | RegExp) {
    return function (target: any, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.patch(url, async (ctx: Context, next: () => Promise<any>) => {
                await fn(ctx, next)
            })
        }
    }
}

export function Delete(url: string | RegExp) {
    return function (target: Function, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.delete(url, async (ctx: Context, next: () => Promise<any>) => {
                await fn(ctx, next)
            })
        }
    }
}

export function All(url: string | RegExp) {
    return function (target: Function, name: string, descriptor: TypedPropertyDescriptor<any>) {
        let fn = descriptor.value;
        descriptor.value = async (router: KoaRouter) => {
            router.all(url, async (ctx: Context, next: () => Promise<any>) => {
                await fn(ctx, next)
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
    return function (target: Function) {
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

export function getApp(): Koa {
    return app;
}
