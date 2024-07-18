const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function () {
	let url = "https://api-web.nhle.com/v1/club-schedule-season/FLA/20242025";

	/* This returns a promise */
	return EleventyFetch(url, {
		duration: "1d", // save for 1 day
		type: "json", // we’ll parse JSON for you
	});
};