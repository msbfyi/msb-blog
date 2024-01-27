// const Parser = require('rss-parser');     
// const parser = new Parser();          
// let rss_feed = 'https://podcasts.103.cat/owww.xml';          
// module.exports = async function() {     
// return await parser.parseURL(rss_feed);     
// };
// convert to es6

const Parser = require('rss-parser');     
const parser = new Parser();       
let rss_feed = 'https://www.youtube.com/feeds/videos.xml?channel_id=UCOk-gHyjcWZNj3Br4oxwh0A';   
console.log(rss_feed);   
console.log("test");   

module.exports = async function() {     
return await parser.parseURL(rss_feed);     
};