const Parser = require('rss-parser');     

const parser = new Parser();
let rss_feed = 'https://podcasts.103.cat/owww.xml';

module.exports = async function() {
    try {
        const feed = await parser.parseURL(rss_feed);
        console.log(feed);
        return feed;
    } catch (error) {
        console.error(error);
        return null;
    }
};