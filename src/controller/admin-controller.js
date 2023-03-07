const axios = require("axios");
const { Game } = require("../models");
const createError = require("../util/createError");

//add game to data bases//=============================================//
//one game
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
      requiredAge: gameDetails.required_age,
      reviews: gameDetails.reviews,
      website: gameDetails.website,
      releaseDate: gameDetails.release_date,
      legal_notice: gameDetails.legal_notice,
      metacritic: gameDetails.metacritic,
    };

    await Game.create(result);

    res.status(200).json({ message: `steam_appid:${appId} has been added` });
  } catch (err) {
    console.log(err);
    createError("Error get game info", 400);
    next(err);
  }
};

//add array of game to data
exports.getGamesToData = async (req, res, next) => {
  const appIds = [
    730, 570, 582010, 990080, 1196590, 1693980, 814380, 1293160, 49520, 620,
    400, 360430, 1296610, 1286680, 887570, 1919590, 1255630, 594650, 704270,
    815370, 928960, 601050, 1713810, 1337010, 979690, 1389360, 1326470, 1448440,
    668580, 1245620, 2050650, 287290, 883710, 221040, 21690, 254700, 222480,
    1173690, 418370, 1449560, 739630, 47780, 1238060, 2239550, 447040, 243470,
    2208920, 359610, 208480, 1085220, 1502260, 260210, 48190, 1278170, 2099140,
    277590, 812140, 911400, 242050, 582160, 359600, 354380, 201870, 368500,
    33230, 289650, 311560, 22813, 1151340, 588430, 377160, 22370, 38410, 38400,
    413150, 1222670, 47890, 550, 500, 1904540, 1488560, 872820, 71270, 324090,
    1569040, 1263850, 1100600, 872790, 624090, 482730, 378120, 295270, 1085660,
    953690, 1861090, 497940, 782330, 2300, 9050, 1148590, 379720, 2280, 239140,
    534380, 278080, 322520, 730310, 4000, 1593500, 1151640, 1817190, 1817070,
    1659420, 1649240, 1259420, 394510, 287700, 1552550, 393360, 601510, 311340,
    1018010, 1449850, 1018020, 996470, 770240, 702700, 1665460,
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
        requiredAge: gameDetails.required_age,
        reviews: gameDetails.reviews,
        website: gameDetails.website,
        releaseDate: gameDetails.release_date,
        legal_notice: gameDetails.legal_notice,
        metacritic: gameDetails.metacritic,
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
