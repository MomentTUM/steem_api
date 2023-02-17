const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const express = require("express");
const authRoute = require("./routes/auth-route")
// const { sequelize } = require("./models")

// sequelize.sync({ force: true })

const app = express();

app.use(express.json())

app.use("/auth", authRoute)

app.use(notFoundMiddleware);

app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`start server at ${port}`));
