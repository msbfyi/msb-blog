import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import pluginRss from '@11ty/eleventy-plugin-rss'
import markdownIt from "markdown-it"
import EleventyFetch from '@11ty/eleventy-fetch'
import postGraph from '@rknightuk/eleventy-plugin-post-graph'
import mastoArchive from 'eleventy-plugin-mastoarchive'
import dotenv from 'dotenv'
import { imageShortcode } from './src/_11ty/imageShortcode.js'
import getCategoryList from  './src/_11ty/getCategoryList.js'
import createCategories from  './src/_11ty/createCategories.js'
import { DateTime } from 'luxon'

dotenv.config();

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default" // opt-out of <img/>-style XHTML single tags
    }
  })
 
  eleventyConfig.addPlugin(postGraph)

  eleventyConfig.addPlugin(mastoArchive, {
    host: 'https://103.social',
    userId: '110642609115838278',
  });

  eleventyConfig.addLayoutAlias('page', 'layouts/page')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')
  eleventyConfig.addLayoutAlias('links', 'layouts/links')

  eleventyConfig.addPassthroughCopy('./src/assets')
  eleventyConfig.addPassthroughCopy('./admin')
  
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode)

  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)
  eleventyConfig.addShortcode("appVer", () => `v${process.env.APP_VERSION || '0.0.0'}`)

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
    console.log(process.env.ELEVENTY_RUN_MODE)
    return collectionApi.getFilteredByGlob('./src/blog/*/*.md')
      .filter(process.env.ELEVENTY_RUN_MODE !== "serve" ? item => !item.data.draft : item => item.data).reverse()
  })
  eleventyConfig.addCollection('categoryList', getCategoryList)
  eleventyConfig.addCollection('categories', createCategories)

  eleventyConfig.addCollection("103Social", function(collection) {
    return collection.getFilteredByGlob("/posts/*.md");
});
  
  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: "<!-- excerpt -->",
    excerpt_alias: 'excerpt'
  })

  eleventyConfig.addGlobalData("env", process.env);

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
