const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	let url = "https://api-web.nhle.com/v1/club-schedule-season/FLA/20242025";

	let season = await EleventyFetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});
		let games = season.games;
		games.sort((a, b) => a.gameDate.localeCompare(b.gameDate));
		const nextGame = games.find(game => game.gameState === 'FUT');
		if (nextGame) {
			nextGame.homeGame = nextGame.homeTeam.abbrev === 'FLA' ? true : false;
		}
		return nextGame;
};