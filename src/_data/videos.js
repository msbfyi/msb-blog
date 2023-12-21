const Parser = require('rss-parser');
const parser = new Parser();

let rss_feed = 'https://podcasts.103.cat/owww.xml';

module.exports = async function() {
	return await parser.parseURL(rss_feed);
};