import dotenv from 'dotenv'
import markdownIt from "markdown-it"
import markdownItAnchor from "markdown-it-anchor";

import pluginRss from '@11ty/eleventy-plugin-rss'


import eleventyNavigationPlugin from '@11ty/eleventy-navigation'
import postGraph from '@rknightuk/eleventy-plugin-post-graph'
import mastoArchive from './_configs/mastoarchive.plugin.js'
import getCategoryList from  './src/_11ty/getCategoryList.js'
import createCategories from  './src/_11ty/createCategories.js'
import { DateTime } from 'luxon'

dotenv.config();

import imageRenderer from "./_configs/markdownlibrary.renderer.image.js";
import cssminification from './_configs/cssminification.shortcode.js';
import notice from './_configs/notice.shortcode.js';
import button from './_configs/button.shortcode.js';
import figure from './_configs/figure.shortcode.js';
import lightbox from './_configs/lightboxref.shortcode.js';
import gallery from './_configs/gallery.shortcode.js';
import video from './_configs/video.shortcode.js';
import excerpt from './_configs/excerpt.shortcode.js';
// import ghRepoCard from './_configs/githubrepocard.shortcode.js';
// import gist from './_configs/gist.shortcode.js';

export default function(eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin)
  eleventyConfig.addPlugin(pluginRss, {
    posthtmlRenderOptions: {
      closingSingleTag: "default" // opt-out of <img/>-style XHTML single tags
    }
  })
 
  eleventyConfig.addPlugin(postGraph)

  eleventyConfig.addPlugin(mastoArchive, {
    host: 'https://social.lol',
    userId: '114631853624870268',
  });

  eleventyConfig.addLayoutAlias('page', 'layouts/page')
  eleventyConfig.addLayoutAlias('article', 'layouts/article')
  eleventyConfig.addLayoutAlias('links', 'layouts/links')

  eleventyConfig.addPassthroughCopy('./src/assets')
  eleventyConfig.addPassthroughCopy('./admin')
  eleventyConfig.addPassthroughCopy({ "node_modules/simplelightbox/dist/simple-lightbox.min.css": "simplelightbox/simple-lightbox.min.css" });
  eleventyConfig.addPassthroughCopy({ "node_modules/simplelightbox/dist/simple-lightbox.min.js": "simplelightbox/simple-lightbox.min.js" });

  
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`)
  eleventyConfig.addShortcode("appVer", () => `v${process.env.APP_VERSION || '0.0.0'}`)


  // Customize Markdown library and settings:
  let markdownLibrary = markdownIt({
    html: true,
    linkify: false,
    typographer: true
  }).use(markdownItAnchor, {
    permalink: markdownItAnchor.permalink.headerLink(),
    level: [1, 2, 3, 4],
    slugify: eleventyConfig.getFilter("slugify")
  });


  // Wrap images in a figure, a, and figcaption.
  // This lets the simplelightbox code serve it up too!
  // Also adds loading lazy attribute
  markdownLibrary.renderer.rules.image = (tokens, idx, options, env, slf) => imageRenderer(tokens, idx, options, env, slf, markdownLibrary);


  // // filter to convert content to Markdown.
  // // Useful for allowing `code` in the h1
  // eleventyConfig.addFilter("markdown", (content) => {
  //   return markdownLibrary.renderInline(content);
  // });

  // Paired shortcode that takes a JSON array of CSS file paths
  // It then combines them, which includes reconciles overriden values!
  // And returns the output.
  eleventyConfig.addPairedShortcode("cssminification", cssminification);
  eleventyConfig.setLibrary("md", markdownLibrary);
  // Re-enable the indented code block feature
  eleventyConfig.amendLibrary("md", mdLib => mdLib.enable("code"))

  //Paired shortcode to display a notice panel like standard, error, warning, etc.
  eleventyConfig.addPairedShortcode("notice", (data, noticeType) => notice(data, noticeType, markdownLibrary));

  //Shortcode to render a button, optionally with a link
  eleventyConfig.addShortcode("button", button);

  // Paired shortcode to display a figure with caption.
  // This is very similar to the regular Markdown image,
  // But I'll keep this around in case the other way ever breaks in the future
  // Plus, this has the 'width' flexibility, and maybe more future features.
  eleventyConfig.addShortcode("figure", (image, caption, widthName, useLightbox=true) => figure(image, caption, widthName, useLightbox, markdownLibrary));

  // If the post contains images, then add the Lightbox JS/CSS and render lightboxes for it.
  // Since it needs access to the `page` object, we can't use arrow notation here.
  eleventyConfig.addShortcode("addLightBoxRefIfNecessary", function () { return lightbox(this.page); });

  // The `gallery` paired shortcode shows a set of images and displays it in a row together.
  eleventyConfig.addPairedShortcode("gallery", (data, caption) => gallery(data, caption, markdownLibrary));


  // The `video` shortcode gets a YouTube video and displays it
  eleventyConfig.addShortcode("video", video);

   // Generate excerpt from first paragraph
   eleventyConfig.addShortcode("excerpt", excerpt);

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
    return collectionApi.getFilteredByGlob('./src/blog/posts/*.md')
      .filter(process.env.ELEVENTY_RUN_MODE !== "serve" ? item => !item.data.draft : item => item.data).reverse()
  })

  eleventyConfig.addCollection('now', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/pages/now/*.md')
      .filter(process.env.ELEVENTY_RUN_MODE !== "serve" ? item => !item.data.draft : item => item.data).reverse()
  })

  /* Creating a collection of blogposts by filtering based on folder and filetype */
  eleventyConfig.addCollection('links', (collectionApi) => {
    return collectionApi.getFilteredByGlob('./src/blog/links/*.md')
      .filter(process.env.ELEVENTY_RUN_MODE !== "serve" ? item => !item.data.draft : item => item.data).reverse()
  })

  eleventyConfig.addCollection('categoryList', getCategoryList)
  eleventyConfig.addCollection('categories', createCategories)

  // TODO Add social.lol archive
  
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
