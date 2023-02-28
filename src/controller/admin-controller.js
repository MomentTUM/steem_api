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
    // await Game.create(result);
    const resScreen = gameDetails?.screenshots;
    const filterScreenshots = resScreen.map((el) => ({
      pathThumbnail: el.path_thumbnail,
      steamAppid: appId,
    }));
    // await Screenshot.create(filterScreenshots);
    const resMovie = gameDetails?.Movie;
    console.log(resMovie);
    res.status(200).json();
    // console.log(resScreen);
  } catch (err) {
    console.log(err);
    createError("Error get game info", 400);
  }
  // };
};
