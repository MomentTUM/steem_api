const cors = require("cors");
const express = require("express");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const authRoute = require("./routes/auth-route");
const authenticateMiddleware = require("./middlewares/authenticate");
const friendRoute = require("./routes/friend-route");
const wishListRoute = require("./routes/wishList-route");
const profileRoute = require("./routes/profile-route");
const steamRoute = require("./routes/steam-route");
// const { sequelize } = require("./models")

// sequelize.sync({ force: true })

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/friend", authenticateMiddleware, friendRoute);
app.use("/wishlist", authenticateMiddleware, wishListRoute);
app.use("/profile", authenticateMiddleware, profileRoute);
app.use("/steam", steamRoute);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`start server at ${port}`));
