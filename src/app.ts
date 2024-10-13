import express from "express";
import bodyParser from "express";
import { port } from "./utils/config";
import { router } from "./adapters/router";
import { notFound } from "./adapters/middleware/notFound";
import { errorHandler } from "./adapters/middleware/errorHandler";

const app = express();

// urlencodedとjsonは別々に初期化する
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());

app.use("/api", router);

// Not Found エラーハンドラ
app.use(notFound);

// エラーハンドリングミドルウェア
app.use(errorHandler);

app.listen(port, () => {
    console.log(`unco_drill listening on port ${port}`);
});
