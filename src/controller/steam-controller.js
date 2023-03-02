const axios = require("axios");
const createError = require("../util/createError");
const { Game } = require("../models");

exports.getGameInfo = async (req, res, next) => {
  const { appId } = req.params;
  // const {currency, language} = req.query
  const currency = "THB";
  const language = "english";
  const apiKey = process.env.STEAM_API_KEY;
  try {
    // Use Axios to make GET request to Steam API to retrieve game details
    const gameDetailsResponse = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}&key=${apiKey}&cc=${currency}&l=${language}`,
    );
    const gameDetails = gameDetailsResponse.data[appId].data;
    res.json(gameDetails);
  } catch (err) {
    // console.error(err);
    createError("Error retrieving game information", 500);
    next(err);
  }
};

exports.getGamesInfo = async (req, res, next) => {
  // const appIds = [730, 570, 582010, 990080, 1196590, 1693980, 814380];
  const appIds = [
    730, 570, 582010, 990080, 1196590, 1693980, 814380, 1293160, 49520, 620,
    400, 360430, 1296610, 1286680, 887570, 1919590, 1255630, 594650, 704270,
    815370, 928960, 601050, 1713810, 1337010, 979690, 1389360,
  ];
  // const {currency, language} = req.query
  const currency = "THB";
  const language = "english";
  const apiKey = process.env.STEAM_API_KEY;
  const getGameInfo = async (appId) => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${appId}&key=${apiKey}&cc=${currency}&l=${language}`,
      );
      // console.log(response);
      const gameDetails = response.data[appId].data;
      // const result = {
      //   gameId: gameDetails?.steam_appid,
      //   name: gameDetails?.name,
      //   aboutTheGame: gameDetails?.about_the_game,
      //   shortDescription: gameDetails?.short_description,
      //   detailedDescription: gameDetails?.detailed_description,
      //   headerImage: gameDetails?.header_image,
      // };
      // console.log(gameDetails);
      // const gameInfo = {
      //   name: gameDetails.name,
      // };
      // console.log(result);
      return gameDetails;
    } catch (err) {
      console.error(err);
      createError("Error retrieving game information", 500);
    }
  };

  try {
    const gamesInfo = appIds.map((appId) => getGameInfo(appId));
    const gamesInfoArray = await Promise.all(gamesInfo);
    // console.log(gamesInfoArray);
    // console.log(gamesInfoArray[0].name);

    // await Game.bulkCreate(gamesInfoArray);

    res.status(200).json(gamesInfoArray);
  } catch (err) {
    console.error(err);
    createError("Error retrieving game information", 500);
  }
};

exports.getAppList = async (req, res, next) => {
  try {
    const response = await axios.get(
      //   "https://api.steampowered.com/ISteamApps/GetAppList/v2/",
      "http://api.steampowered.com/ISteamApps/GetAppList/v0002/?key=STEAMKEY&format=json",
    );

    // console.log(response);
    // res.json(games);
    res.json(1);
  } catch (error) {
    console.error(err);
    createError("Error retrieving game information", 500);
  }
};
