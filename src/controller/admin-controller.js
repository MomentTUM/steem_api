const axios = require("axios");
const { Game, Screenshot, Movie } = require("../models");
const createError = require("../util/createError");

exports.getGameToData = async (req, res, next) => {
  const { appId } = req.params;
  const currency = "THB";
  const language = "english";
  const apiKey = process.env.STEAM_API_KEY;
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
    const resScreen = gameDetails?.screenshots;
    const filterScreenshots = resScreen.map((el) => ({
      pathThumbnail: el.path_thumbnail,
      gameId: game.id,
    }));
    await Screenshot.bulkCreate(filterScreenshots);
    const resMovie = gameDetails?.movies;
    const filterScreenMovie = resMovie.map((el) => ({
      name: el.name,
      thumbnail: el.thumbnail,
      mp4: el.mp4["480"],
      gameId: game.id,
    }));
    await Movie.bulkCreate(filterScreenMovie);
    res.status(200).json();
  } catch (err) {
    console.log(err);
    createError("Error get game info", 400);
    next(err);
  }
};

exports.getGamesToData = async (req, res, next) => {
  // const appIds = [730, 570, 582010, 990080, 1196590, 1693980, 814380];
  const appIds = [
    730, 570, 582010, 990080, 1196590, 1693980, 814380, 1293160, 49520, 620,
    400, 360430, 1296610, 1286680, 887570, 1919590, 1255630, 594650, 704270,
    815370, 928960, 601050, 1713810, 1337010, 979690, 1389360,
  ];
  const currency = "THB";
  const language = "english";
  const apiKey = process.env.STEAM_API_KEY;
  const getGameInfo = async (appId) => {
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

      const resScreen = gameDetails?.screenshots;
      const filterScreenshots = resScreen.map((el) => ({
        pathThumbnail: el.path_thumbnail,
        gameId: game.id,
      }));
      console.log(resScreen);
      await Screenshot.bulkCreate(filterScreenshots);
      const resMovie = gameDetails?.movies;
      const filterScreenMovie = resMovie.map((el) => ({
        name: el.name,
        thumbnail: el.thumbnail,
        mp4: el.mp4["480"],
        gameId: game.id,
      }));

      await Movie.bulkCreate(filterScreenMovie);
      return { message: `steam_appid:${appId} has been added` };
    } catch (err) {
      console.log(err);
      createError("Error get game info", 400);
      next(err);
    }
  };
  try {
    const gamesInfo = appIds.map((appId) => getGameInfo(appId));
    const gamesInfoArray = await Promise.all(gamesInfo);
    res.status(200).json(gamesInfoArray);
  } catch (err) {
    next(err);
  }
};
