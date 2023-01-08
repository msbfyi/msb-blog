module.exports = function(eleventyConfig) {
    // eleventyConfig.addPassthroughCopy("style")
    // eleventyConfig.addPassthroughCopy("assets")

    // Return your Object options:
    return {
        dir: {
            input: "src",
            data: "_data",
            includes: "../_includes",
            layouts: "../_layouts"
        }
    }
  };