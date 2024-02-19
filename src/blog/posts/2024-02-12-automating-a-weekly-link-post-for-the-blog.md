---
title: Automating a weekly link post for the blog
description: "Generating a weekly link post based on Raindrop.io and Eleventy"
date: 2024-02-17T05:00:21.222Z
preview: ""
draft: false
tags:
    - eleventy
category: Update
---

Based on the post by [Sophie](https://social.lol/@sophie) on her [blog](https://localghost.dev/blog/automated-weekly-links-posts-with-raindrop-io-and-eleventy/), I'm going to automate a weekly link post. For now going to implement against Raindrop, which I recently migrated my Pocket posts to, and very much liking the interface and workflow so far.

<!-- excerpt -->

I have been trying to find a good way to capture links for a while now. I had been using Pocket, but with the recent changes at Mozilla that feels like its a bit iffy on it's long term sustainability. The other factor is I would like to use Pocket and my Kobo Reader to deliver articles to read on my device, and not necessarily as a way to curate links.

I recently came across [Sophie](https://social.lol/@sophie)'s solution on her [blog](https://localghost.dev/blog/automated-weekly-links-posts-with-raindrop-io-and-eleventy/). Using [Raindrop](https://raindrop.io/) was a new piece to my workflow, and it's been very easy to use to grab links from RSS and my Mastodon feed.

Next up for the blog is to implement a personal API based to automate my /now page based on [Robb Knight's](https://robbknight.com/) [blog post](https://robbknight.com/2023/12/31/now-page-api.html).

**Update**

First post is live! I've updated Sophie's script to auto archive all of the links in the post into a new nested collection in Raindrop, that uses the "Posted on ..." with the matching date of the post.

The first week is [here](/blog/this-weeks-in-links-2024-02-18/).