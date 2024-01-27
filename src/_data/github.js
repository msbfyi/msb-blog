const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {
    console.log("Fetching GitHub stargazers count...");
  try {
    // https://developer.github.com/v3/repos/#get
    let json = await EleventyFetch("https://api.github.com/repos/11ty/eleventy", {
      duration: "1d", // 1 day
      type: "json" // also supports "text" or "buffer"
    });
    console.log( "Success getting GitHub stargazers count" );

    return {

      stargazers: json.stargazers_count
    };
  } catch(e) {
    console.log( "Failed getting GitHub stargazers count, returning 0" );
    return {
      stargazers: 0
    };
  }
};