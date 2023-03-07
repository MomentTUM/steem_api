const axios = require("axios");
const {
  Game,
  Screenshot,
  Movie,
  Price,
  MacRequirement,
  LinuxRequirement,
  PcRequirement,
  Developer,
  Publisher,
  Platform,
} = require("../models");
// const Price = require("../models/Price");
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
    // console.log(gameDetails.is_free);
    const result = {
      steamAppid: gameDetails?.steam_appid,
      name: gameDetails?.name,
      aboutTheGame: gameDetails?.about_the_game,
      shortDescription: gameDetails?.short_description,
      detailedDescription: gameDetails?.detailed_description,
      headerImage: gameDetails?.header_image,
      isFree: gameDetails?.is_free,
      recommendations: gameDetails?.recommendations["total"],
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
      steamAppid: gameDetails?.steam_appid,
    }));
    await Screenshot.bulkCreate(filterScreenshots);
    const resMovie = gameDetails?.movies;
    const filterScreenMovie = resMovie.map((el) => ({
      name: el.name,
      thumbnail: el.thumbnail,
      mp4: el.mp4["480"],
      gameId: game.id,
      steamAppid: gameDetails?.steam_appid,
    }));
    await Movie.bulkCreate(filterScreenMovie);
    if (game.isFree === false) {
      const resPrice = gameDetails?.price_overview;
      await Price.create({
        currency: resPrice.currency,
        initial: resPrice.initial,
        final: resPrice.final,
        discountPercent: resPrice.discount_percent,
        initialFormatted: resPrice.initial_formatted,
        finalFormatted: resPrice.final_formatted,
        gameId: game.id,
        steamAppid: gameDetails?.steam_appid,
      });
    }
    // console.log(Array.isArray({}));
    // console.log("a");
    if (
      !Array.isArray(gameDetails?.mac_requirements.length) &&
      gameDetails?.mac_requirements?.minimum
    ) {
      const resMacReq = gameDetails?.mac_requirements;
      await MacRequirement.create({
        minimum: resMacReq.minimum,
        recommended: resMacReq.recommended,
        gameId: game.id,
        steamAppid: gameDetails?.steam_appid,
      });
    }
    if (
      !Array.isArray(gameDetails?.mac_requirements.length) &&
      gameDetails?.pc_requirements?.minimum
    ) {
      const resLinuxReq = gameDetails?.linux_requirements;
      await LinuxRequirement.create({
        minimum: resLinuxReq.minimum,
        recommended: resLinuxReq.recommended,
        gameId: game.id,
        steamAppid: gameDetails?.steam_appid,
      });
    }
    console.log(gameDetails?.pc_requirements.minimum);
    console.log(!Array.isArray(gameDetails?.pc_requirements.length));
    if (
      !Array.isArray(gameDetails?.mac_requirements.length) &&
      gameDetails?.pc_requirements?.minimum
    ) {
      const resPcReq = gameDetails?.pc_requirements;
      await PcRequirement.create({
        minimum: resPcReq.minimum,
        recommended: resPcReq.recommended,
        gameId: game.id,
        steamAppid: gameDetails?.steam_appid,
      });
    }
    const resPlatform = gameDetails?.platforms;
    await Platform.create({
      window: resPlatform.windows,
      mac: resPlatform.mac,
      linux: resPlatform.linux,
      gameId: game.id,
      steamAppid: gameDetails?.steam_appid,
    });
    const resDeveloper = gameDetails?.developers;
    const filterDeveloper = resDeveloper.map((el) => ({
      name: el,
      gameId: game.id,
      steamAppid: gameDetails?.steam_appid,
    }));
    // console.log(filterDeveloper);
    await Developer.bulkCreate(filterDeveloper);
    const resPublisher = gameDetails?.publishers;
    // console.log(resPublisher);
    const filterPublisher = resPublisher.map((el) => ({
      name: el,
      gameId: game.id,
      steamAppid: gameDetails?.steam_appid,
    }));
    // console.log(filterPublisher);
    await Publisher.bulkCreate(filterPublisher);
    res.status(200).json({ message: `steam_appid:${appId} has been added` });
  } catch (err) {
    console.log(err);
    createError("Error get game info", 400);
    next(err);
  }
};

exports.getGamesToData = async (req, res, next) => {
  const appIds = [
    730, 570, 582010, 990080, 1196590, 1693980, 814380, 1293160, 49520, 620,
    400, 360430, 1296610, 1286680, 887570, 1919590, 1255630, 594650, 704270,
    815370, 928960, 601050, 1713810, 1337010, 979690, 1389360, 1326470, 1448440,
    668580, 1245620, 2050650, 287290, 883710, 221040, 21690, 254700, 222480,
    1173690, 418370, 1449560, 739630, 47780, 1238060, 2239550, 447040, 243470,
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
      // console.log(gameDetails.is_free);
      const result = {
        steamAppid: gameDetails?.steam_appid,
        name: gameDetails?.name,
        aboutTheGame: gameDetails?.about_the_game,
        shortDescription: gameDetails?.short_description,
        detailedDescription: gameDetails?.detailed_description,
        headerImage: gameDetails?.header_image,
        isFree: gameDetails?.is_free,
        recommendations: gameDetails?.recommendations["total"],
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
        steamAppid: gameDetails?.steam_appid,
      }));
      await Screenshot.bulkCreate(filterScreenshots);
      const resMovie = gameDetails?.movies;
      if (resMovie) {
        const filterScreenMovie = resMovie.map((el) => ({
          name: el.name,
          thumbnail: el.thumbnail,
          mp4: el.mp4["480"],
          gameId: game.id,
          steamAppid: gameDetails?.steam_appid,
        }));
        await Movie.bulkCreate(filterScreenMovie);
      }
      if (game.isFree === false) {
        const resPrice = gameDetails?.price_overview;
        await Price.create({
          currency: resPrice.currency,
          initial: resPrice.initial,
          final: resPrice.final,
          discountPercent: resPrice.discount_percent,
          initialFormatted: resPrice.initial_formatted,
          finalFormatted: resPrice.final_formatted,
          gameId: game.id,
          steamAppid: gameDetails?.steam_appid,
        });
      }
      // console.log(Array.isArray({}));
      // console.log("a");
      if (
        !Array.isArray(gameDetails?.mac_requirements.length) &&
        gameDetails?.mac_requirements?.minimum
      ) {
        const resMacReq = gameDetails?.mac_requirements;
        await MacRequirement.create({
          minimum: resMacReq.minimum,
          recommended: resMacReq.recommended,
          gameId: game.id,
          steamAppid: gameDetails?.steam_appid,
        });
      }
      if (
        !Array.isArray(gameDetails?.mac_requirements.length) &&
        gameDetails?.pc_requirements?.minimum
      ) {
        const resLinuxReq = gameDetails?.linux_requirements;
        await LinuxRequirement.create({
          minimum: resLinuxReq.minimum,
          recommended: resLinuxReq.recommended,
          gameId: game.id,
          steamAppid: gameDetails?.steam_appid,
        });
      }
      // console.log(gameDetails?.pc_requirements.minimum);
      // console.log(!Array.isArray(gameDetails?.pc_requirements.length));
      if (
        !Array.isArray(gameDetails?.mac_requirements.length) &&
        gameDetails?.pc_requirements?.minimum
      ) {
        const resPcReq = gameDetails?.pc_requirements;
        await PcRequirement.create({
          minimum: resPcReq.minimum,
          recommended: resPcReq.recommended,
          gameId: game.id,
          steamAppid: gameDetails?.steam_appid,
        });
      }
      const resPlatform = gameDetails?.platforms;
      await Platform.create({
        window: resPlatform.windows,
        mac: resPlatform.mac,
        linux: resPlatform.linux,
        gameId: game.id,
        steamAppid: gameDetails?.steam_appid,
      });
      const resDeveloper = gameDetails?.developers;
      const filterDeveloper = resDeveloper.map((el) => ({
        name: el,
        gameId: game.id,
        steamAppid: gameDetails?.steam_appid,
      }));
      // console.log(filterDeveloper);
      await Developer.bulkCreate(filterDeveloper);
      const resPublisher = gameDetails?.publishers;
      // console.log(resPublisher);
      const filterPublisher = resPublisher.map((el) => ({
        name: el,
        gameId: game.id,
        steamAppid: gameDetails?.steam_appid,
      }));
      await Publisher.bulkCreate(filterPublisher);
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
