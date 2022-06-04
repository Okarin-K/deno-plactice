import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const books = [
    {
        id: 1,
        title: "方法序説",
        author: "ルネ・デカルト",
    },
    {
        id: 2,
        title: "良いコード/悪いコードで学ぶ設計入門",
        author: "仙塲大也",
    },
    {
        id: 3,
        title: "ゼロの使い魔",
        author: "ヤマグチノボル",
    },
];

const router = new Router();

router
    .get("/", (context) => {
        context.response.body = "Hello world!";
    })
    .get("/book", (context) => {
        context.response.body = books;
    })
    .get("/book/:id", (context) => (context.response.body = books.find((_) => _.id === Number(context.params.id))))
    .post("/book", async (context) => {
        const result = context.request.body({
            contentTypes: {
                text: ["application/json"],
            },
        });

        const body = await result.value;
        console.log(body);
    });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });
