const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

//display all games
indexRouter.get("/", indexController.getGames);
indexRouter.get("/search", indexController.getSearch);
indexRouter.get("/developers", indexController.getDevelopers);
indexRouter.get("/developers/:developer", indexController.getGamesByDeveloper);
indexRouter.get("/genres", indexController.getGenres);
indexRouter.get("/genres/:genre", indexController.getGamesByGenre);
indexRouter.get("/platforms", indexController.getPlatforms);
indexRouter.get("/platforms/:platform", indexController.getGamesByPlatform);



/*indexRouter.post("/newgame", (req, res));
indexRouter.post("/delete" (req, res));

indexRouter.get("/developers/:developer", (req, res) );
indexRouter.get("/genre/:genre", (req, res) );
indexRouter.get("/platform/:platform", (req, res) );

indexRouter.get("/search", (req, res));
*/

module.exports = indexRouter;