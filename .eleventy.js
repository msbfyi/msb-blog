module.exports = function(eleventyConfig) {
    const handlebars = require('handlebars')
	eleventyConfig.setLibrary('hbs', handlebars)
    eleventyConfig.addPassthroughCopy("style")
    eleventyConfig.addPassthroughCopy("assets")

    // Return your Object options:
    // return {
    //   dir: {
    //     input: "./src",
    //     layouts: "./_layouts",
    //     output: "_dist"
    //   }
    // }
  };