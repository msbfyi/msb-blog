const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	let url = "https://api-web.nhle.com/v1/club-schedule-season/FLA/20242025";

	let season = await EleventyFetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});
	/* This returns a promise */
	// add a function to get the next game by date from season
	season.getNextGame = function () {
		// const now = new Date();
		// const nextGame = this.data.find(game => new Date(game.date) > now);
		// return nextGame;
		return "Next game date";
	};

	console.log(season.getNextGame);
	return season;
};