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
    const gameDetailsResponse = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}&key=${apiKey}&cc=${currency}&l=${language}`,
    );
    const gameDetails = gameDetailsResponse?.data?.[appId]?.data;
    res.json(gameDetails);
  } catch (err) {
    createError("Error retrieving game information (getGame)", 500);
    next(err);
  }
};

exports.getGamesInfo = async (req, res, next) => {
  const appIds = [
    730, 570, 582010, 990080, 1196590, 1693980, 814380, 1293160, 49520, 620,
    400, 360430, 1296610, 1286680, 887570, 1919590, 1255630, 594650, 704270,
    815370, 928960, 601050, 1713810, 1337010, 979690, 1389360, 1326470, 1448440,
    668580, 1245620, 2050650, 287290, 883710, 221040, 21690, 254700, 222480,
    1173690, 418370, 1449560, 739630, 47780, 1238060, 2239550, 447040, 243470,
  ];
  // const appIds = [
  //   730, 570, 582010, 990080, 1196590, 1693980, 814380, 1293160, 49520, 620,
  //   400, 360430, 1296610, 1286680, 887570, 1919590, 1255630, 594650, 704270,
  //   815370, 928960, 601050, 1713810, 1337010, 979690, 1389360, 1326470, 1448440,
  //   668580, 1245620, 2050650, 287290, 883710, 221040, 21690, 254700, 222480,
  //   1173690, 418370, 1449560, 739630, 47780, 1238060, 2239550, 447040, 243470,
  //   2208920, 359610, 208480, 1085220, 1502260, 260210, 48190, 1278170, 2099140,
  //   277590, 812140, 911400, 242050, 582160, 359600, 354380, 201870, 368500,
  //   33230, 289650, 311560, 22813, 1151340, 588430, 377160, 22370, 38410, 38400,
  //   413150, 1222670, 47890, 550, 500, 1904540, 1488560, 872820, 71270, 324090,
  //   1569040, 1263850, 1100600, 872790, 624090, 482730, 378120, 295270, 1085660,
  //   953690, 1861090, 497940, 782330, 2300, 9050, 1148590, 379720, 2280, 239140,
  //   534380, 278080, 322520, 730310, 4000, 1593500, 1151640, 1817190, 1817070,
  //   1659420, 1649240, 1259420, 394510, 287700, 1552550, 393360, 601510, 311340,
  //   1018010, 1449850, 1018020, 996470, 770240, 702700, 1665460,
  // ];
  // const {currency, language} = req.query
  const currency = "THB";
  const language = "english";
  const apiKey = process.env.STEAM_API_KEY;
  const getGameInfo = async (appId) => {
    try {
      const response = await axios.get(
        `https://store.steampowered.com/api/appdetails?appids=${appId}&key=${apiKey}&cc=${currency}&l=${language}`,
      );
      const gameDetails = response?.data?.[appId]?.data;
      return gameDetails;
    } catch (err) {
      console.error(err);
      createError("Error retrieving game information", 500);
    }
  };

  try {
    const gamesInfo = appIds?.map((appId) => getGameInfo(appId));
    const gamesInfoArray = await Promise.all(gamesInfo);
    res.status(200).json(gamesInfoArray);
  } catch (err) {
    console.error(err);
    createError("Error retrieving game information (getGames)", 500);
  }
};

exports.getAppList = async (req, res, next) => {
  try {
    const apiKey = process.env.STEAM_API_KEY;
    const appList = await axios.get(
      `https://api.steampowered.com/ISteamApps/GetAppList/v2/&key=${apiKey}`,
    );

    res.json(appList);
  } catch (error) {
    console.error(err);
    createError("Error retrieving game information (getAppList)", 500);
  }
};
