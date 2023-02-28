const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const authRoute = require("./routes/auth-route");
const authenticateMiddleware = require("./middlewares/authenticate");
const friendRoute = require("./routes/friend-route");
const wishListRoute = require("./routes/wishList-route");
const profileRoute = require("./routes/profile-route");
const steamRoute = require("./routes/steam-route");
const chatRoute = require("./routes/chat-route");
const cartRoute = require("./routes/cart-route");
const userRoute = require("./routes/user-route");
const gameRoute = require("./routes/game-route");
const adminRoute = require("./routes/admin-route");
// const { sequelize } = require("./models")

// sequelize.sync({ force: true })

app.use(cors());
app.use(express.json());

app.use("/auth", authRoute);
app.use("/friend", authenticateMiddleware, friendRoute);
app.use("/wishlist", authenticateMiddleware, wishListRoute);
app.use("/profile", authenticateMiddleware, profileRoute);
// app.use("/steam", authenticateMiddleware, steamRoute);
app.use("/steam", steamRoute);
app.use("/chat", authenticateMiddleware, chatRoute);
app.use("/cart", authenticateMiddleware, cartRoute);
app.use("/user", authenticateMiddleware, userRoute);
app.use("/admin", adminRoute);
app.use("/game", gameRoute);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

module.exports = server;
