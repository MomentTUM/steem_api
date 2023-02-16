const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const express = require("express");

const app = express();

app.use(notFoundMiddleware);

app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`start server at ${port}`));
