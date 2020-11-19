const Koa = require('koa');

// 导入controller middleware:
const controller = require('./controller');

const app = new Koa();

// add controllers:
app.use(controller());

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

app.listen(3000);
console.log('app started at port 3000...');