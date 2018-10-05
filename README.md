# koa2-router-decorator
koa-router decorator 


## Installation

```bash
$ npm i koa2-router-decorator --save
```

## Usage

To use it with typescripts you should enable `experimentalDecorators` and `emitDecoratorMetadata` in `tsconfig.json`


### Development 

```bash
npm install -g typescript
npm install -g tslint
npm install koa --save
npm install @types/koa --save-dev
npm install reflect-metadata --save-dev
```


# hello koa2-router-decorator

```js
import "reflect-metadata"; // this shim is required

import { getApp } from "koa2-router-decorator"

const app = getApp(`${__dirname}/controller`);
app.listen(3000);
```


### Example

```js
import { Controller, Get, Post } from "koa2-router-decorator"
import { Context } from "koa";
@Controller("/user")
export class User {
    @Get("/seay")
    async seay(ctx: Context) {

        return { err_code: 0, msg: "hello world!" }
    };
    @Post("/")
    async create(ctx: Context) {
        const { name, age, sex } = ctx.request.body;

        ctx.status = 200;
        ctx.body = {
            err_code: 0,
            data: {
                name,
                age,
                sex
            }
        }
    }
}

```
