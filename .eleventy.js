const eleventyNavigationPlugin = require('@11ty/eleventy-navigation')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const markdownIt = require("markdown-it")
// const UpgradeHelper = require("@11ty/eleventy-upgrade-help");
const EleventyFetch = require('@11ty/eleventy-fetch')
const postGraph = require('@rknightuk/eleventy-plugin-post-graph')
const mastoArchive = require('eleventy-plugin-mastoarchive');
const EleventyPluginOgImage = require('eleventy-plugin-og-image');

const { DateTime } = require('luxon')

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default" // opt-out of <img/>-style XHTML single tags
    }
  })

  // TODO finish out https://lewisdale.dev/post/adding-statically-generated-open-graph-images/
  // https://rknight.me/blog/generating-and-caching-open-graph-images-with-eleventy/
  eleventyConfig.addPlugin(EleventyPluginOgImage, {
    outputDir: 'src/assets/ogi',
		satoriOptions: {
			fonts: [
			{
				name: 'Pixeboy',
				data: fs.readFileSync('./fonts/Pixeboy.ttf'),
				weight: 700,
				style: 'normal',
			},
			],
		},
	})
  eleventyConfig.watchIgnores.add('src/assets/ogi/**/*')
  
  eleventyConfig.addPlugin(postGraph)

  eleventyConfig.addPlugin(mastoArchive, {
    host: 'https://103.social',
    userId: '110642609115838278',
  });

  eleventyConfig.addLayoutAlias('page', 'layouts/page')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')
  eleventyConfig.addLayoutAlias('links', 'layouts/links')

  eleventyConfig.addPassthroughCopy('./src/assets')
  
  eleventyConfig.addNunjucksAsyncShortcode('image', require('./src/_11ty/imageShortcode').imageShortcode)

  eleventyConfig.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'America/Los_Angeles',
    }).setLocale('en').toLocaleString(DateTime.DATE_FULL)
  })

  eleventyConfig.addFilter('dateFilter', dateObj => {
    const postJSDate = DateTime.fromJSDate(dateObj, {
      zone: 'America/Los_Angeles',
    }).setLocale('en')
    const postYear = postJSDate.toLocaleString({ year: 'numeric' });
    const postMonth = postJSDate.toLocaleString({ month: 'numeric' }).toString().padStart(2, '0');
    const postDay = postJSDate.toLocaleString({ day: 'numeric' }).toString().padStart(2, '0');
    return `${postMonth}/${postDay}/${postYear}`;
  })

  eleventyConfig.addFilter('urlDateFilter', dateObj => {
    const postJSDate = DateTime.fromJSDate(dateObj, {
      zone: 'America/Los_Angeles',
    }).setLocale('en')
    const postYear = postJSDate.toLocaleString({ year: 'numeric' });
    const postMonth = postJSDate.toLocaleString({ month: 'numeric' }).toString().padStart(2, '0');
    const postDay = postJSDate.toLocaleString({ day: 'numeric' }).toString().padStart(2, '0');
    return `${postYear}-${postMonth}-${postDay}`;
  })

  eleventyConfig.addFilter("md", function (content = "") {
    return markdownIt({ html: true }).render(content);
  })

  
  /* Creating a collection of blogposts by filtering based on folder and filetype */
  eleventyConfig.addCollection('blog', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/blog/*/*.md').reverse()
  })
  eleventyConfig.addCollection('categoryList', require('./src/_11ty/getCategoryList'))
  eleventyConfig.addCollection('categories', require('./src/_11ty/createCategories'))

  eleventyConfig.addCollection("103Social", function(collection) {
    return collection.getFilteredByGlob("/posts/*.md");
});
  
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: 'excerpt'
  })

  return {
    dir: {
      input: 'src',
      output: '_site',
      includes: '_includes',
      data: '_data'
    },
    markdownTemplateEngine: 'njk'
  } 
}
