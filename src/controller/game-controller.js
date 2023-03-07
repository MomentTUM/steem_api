const { Game } = require("../models");
const createError = require("../util/createError");
const { Op } = require("sequelize");

exports.getAllGame = async (req, res, next) => {
  try {
    const game = await Game.findAll({
      where: { deletedAt: null },
    });
    // console.log(JSON.parse(game));
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};

exports.getGameByName = async (req, res, next) => {
  try {
    const { name } = req.query;
    const game = await Game.findAll({
      where: {
        [Op.like]: `%${name}%`,
        deletedAt: null,
      },
    });
    if (!game) {
      createError("This game not have in my store", 400);
    }
    res.status(200).json(game);
  } catch (err) {
    next(err);
  }
};

//add game to data bases//=============================================//

const axios = require("axios");

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
      isFree: gameDetails?.is_free,
      recommendations: gameDetails?.recommendations,
      priceOverview: gameDetails.price_overview,
      pcRequirements: gameDetails.pc_requirements,
      MacRequirements: gameDetails.mac_requirements,
      linuxRequirements: gameDetails.linux_requirements,
      publishers: gameDetails.publishers,
      developers: gameDetails.developers,
      platforms: gameDetails.platforms,
      categories: gameDetails.categories,
      genres: gameDetails.genres,
      screenshots: gameDetails.screenshots,
      movies: gameDetails.movies,
      background: gameDetails.background,
    };

    await Game.create(result);

    res.status(200).json({ message: `steam_appid:${appId} has been added` });
  } catch (err) {
    console.log(err);
    createError("Error get game info", 400);
    next(err);
  }
};

exports.getGamesToData = async (req, res, next) => {
  const appIds = [
    730, 570, 582010, 990080, 1196590, 1693980, 814380, 1293160, 620, 400,
    360430, 1296610, 1286680, 887570, 1919590, 1255630, 594650, 49520, 704270,
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
        isFree: gameDetails?.is_free,
        recommendations: gameDetails?.recommendations,
        priceOverview: gameDetails.price_overview,
        pcRequirements: gameDetails.pc_requirements,
        MacRequirements: gameDetails.mac_requirements,
        linuxRequirements: gameDetails.linux_requirements,
        publishers: gameDetails.publishers,
        developers: gameDetails.developers,
        platforms: gameDetails.platforms,
        categories: gameDetails.categories,
        genres: gameDetails.genres,
        screenshots: gameDetails.screenshots,
        movies: gameDetails.movies,
        background: gameDetails.background,
      };
      await Game.create(result);
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
