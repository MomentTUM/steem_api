const axios = require("axios");
const { Game, Screenshot, Movie } = require("../models");
const createError = require("../util/createError");

exports.getGameToData = async (req, res, next) => {
  const { appId } = req.params;
  const currency = "THB";
  const language = "english";
  const apiKey = process.env.STEAM_API_KEY;
  // const getGameInfo = async (appIds) => {
  try {
    const gameDetailsResponse = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}&key=${apiKey}&cc=${currency}&l=${language}`,
    );
    const gameDetails = gameDetailsResponse.data[appId].data;
    const result = {
      steamAppid: gameDetails?.steam_appid,
      name: gameDetails?.name,
      aboutTheGame: gameDetails?.about_the_game,
      shortDescription: gameDetails?.short_description,
      detailedDescription: gameDetails?.detailed_description,
      headerImage: gameDetails?.header_image,
    };
    await Game.create(result);
    const game = await Game.findOne({
      where: {
        steam_appid: appId,
      },
    });
    // console.log(game.id);
    const resScreen = gameDetails?.screenshots;
    const filterScreenshots = resScreen.map((el) => ({
      pathThumbnail: el.path_thumbnail,
      gameId: game.id,
    }));
    await Screenshot.bulkCreate(filterScreenshots);
    // pathThumbnail: "hello",
    //   pathThumbnail: gameDetails?.screenshots[0].path_thumbnail,
    //   gameId: 1,
    // });
    const resMovie = gameDetails?.movies;
    const filterScreenMovie = resMovie.map((el) => ({
      name: el.name,
      thumbnail: el.thumbnail,
      mp4: el.mp4["480"],
      gameId: game.id,
    }));
    await Movie.bulkCreate(filterScreenMovie);
    // console.log(resMovie);
    res.status(200).json();
    // console.log(resScreen);
  } catch (err) {
    console.log(err);
    createError("Error get game info", 400);
  }
  // };
};
