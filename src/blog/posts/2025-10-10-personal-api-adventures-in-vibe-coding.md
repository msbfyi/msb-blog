---
title: "Personal API: Adventures in Vibe Coding Part 1"
description: ""
date: 2025-10-10T16:15:38.443Z
preview: ""
draft: false
tags: []
categories: []
---
For a while, I wanted to create a personal data tracking API based on the work that Cory Dransfeldt ([coryd.dev](coryd.dev.md)) had documented in his talk for the [11ty Meetup last year](https://www.coryd.dev/posts/2024/11ty-meetup-tracking-and-displaying-music-history). I'd been following his and [Robb Knight's](http://rknight.me) work for a while, and the combination of [Slash Pages](http://slashpages.net) and the automated gathering of watch/play/listen/etc data for display on my own site had been bouncing around in my head for more than a year. I'm a firm believer that if we are going to feed this much data into systems, we should at the very least have a canonical place that we can own ourselves.

I'd started this work by creating and hand-crafting the [/now](http://msb.fyi/now/) pages on this site, but, like much else, that manual process fell victim to entropy and "life getting busy." I still track on GoodReads, Trakt.tv, and other social sites, so the data is available for harvesting.

In addition, I have needed a project to run AI coding tools through their paces and gain a much deeper understanding of where we stand with those coding assistants. I (like many of the people I follow) have had mixed feelings about how AI companies mined the data that powers the chatbot, but it's foolish to think that these "robots" will not be a part of my chosen career in the future. Additionally, if I'm going to have a place to form criticism, I need to have experience with the tooling.

All of this background leads to the Personal API project that I've been working on over the last month. I had some high-level goals when I started.

- Experiment with chatbots in generating requirement documents (PRDs) and replicate the process I use in my day-to-day work with an engineering, product, and design team. Observe where the language and process are similar when working with an AI-powered "team".
- Evaluate different toolchains. We use [Cursor](https://cursor.com) at work, and I wanted to experiment with other tools in a low-risk environment.
- Establish a personal process for utilizing these tools and develop a best practice approach.

I hadn't anticipated writing all of this up, but I've discussed this project several times, and it's probably best to document it in one place.

## Part 1: Initial setup

I started out very basic and had chat sessions with Claude to determine approach, stack, how to best document to use tools, etc.

I went through a few iterations that included Ruby on Rails, Directus, Express, and Python. I had originally wanted to use this as an opportunity to standup a home lab hosted backend service, but I pivoted to use [Supabase](https://supabase.com/) to start as it would give me some guard rails while allowing me to switch to a different backend and keep the Postgres table structures.

I decided to start the project using Trak.tv as the datasource I would ingest to my personal API system since it was well documented and allowed for me to reseed the database from the Trak history easily.

In Claude desktop I started the chat session to develop the plan. I could very well have done this in planning mode inside Claude Code, but I made the conscious decision to use Claude Desktop to be a product partner in coming up with the project requirements and then bring that into Claude Code. This helped with a few things. Claude Desktop didn't have access to the repository so for this initial setup it was using more general principals. It also couldn't just jump into coding. If you look at a IRL team process having engineers jump straight to code can lead the project in the wrong direction, especially in the first phases of setup. I really wanted this to act as a separation of concerns in the initial setup. Going forward, I will be doing more of the planning phase directly inside Claude Code so that the plan can benefit from the context of the code base it self.

My initial prompt
```
Ok I've decided to use Supabase. I am looking to setup my personal API project. The initial idea is to have an API that I can use to build my personal website off of data that I collect from across the internet. I would store and update Webfinger information, my profile link page, and other personal meta data that I can use to build out social pages. Also I want to pull in media consumption from Trak.tv for movies and TV and then be able to update posters from [https://theposterdb.com](https://theposterdb.com/) via the supabase interface. I will eventually want to pull in Steam games, books, music, etc. I want to start with the trak.tv integration. In my mind I see myself adding a view to trak.tv and then using the webhooks from trak.tv or echofeed make a call to my API to add the moive or tv show. Also if I have watched it before, add to the views instead of creating a whole new movie/tv entry
```

This output included our initial plan and some sample scripts. The most important artifact for me was the Trakt.tv Data Backfill guide and the database schema scripts. I was able to input those directly into the Supabase interface and generate the tables. Since the time I did this I've installed the Supabase MCP and I would most likely utilize that so that Claude can manage the tables directly. Since these tools are non-deterministic I do like the approach of managing the running of the scripts myself to validate the changes before production data is touched. It's the same process I would use when reviewing code before executing against any production system. So far the analogy of approaching the AI tools as if they are my virtual team is holding up.

Through the course of the work with Claude we got a [movie-backfill script](https://github.com/msbfyi/msbapi/blob/main/packages/shared/scripts/movie-backfill.js) and [full documentation](https://github.com/msbfyi/msbapi/blob/main/packages/shared/scripts/movie-backfill_guide.md) and I used this as the basis of seeding the database.

This prompt also generated the draft of the edge functions that I'll use to update the database going forward. I'm using Robb Knight's [EchoFeed](http://echofeed.app) to call a webhook that is implmented in the edge functions to automatically let my system know "new movie watched" and then the edge function fetches data from [theMovieDB](http://themoviedb.org) to fill out the data in my system. I will be setting this up to work for TV as well. When I hit errors, I would paste those into the chat session and troubleshoot with the chatbot. It operated very much like a pair coding session. There were several times where I would tell the chatbot "no, wrong path. Go back to this point and try again with this information." Trial and error, much the same way a normal working session would go.

This got me to my initial state where I'd log a movie in Trakt's app, EchoFeed would pick up the new event from the public RSS feed from Trakt, and then fire the webhook to tell my personal api that a new record needed to be created. 

This capture process has now worked for about 20 days for movies, data about when it was watched, and fetching enhanced data that I can add too. Since I have all of the ids for theMovieDB and Trakt I can always fetch additional metadata at a later point.

![](/src/assets/images/movie-table1.jpeg)

That closes out the first part of this project. I wanted to get that initial setup and Supabase stood up so that I could build on top of it. The next phase is going to be creating the admin interface to update and add data outside of the tracking apps I have.

The code for the initial setup can be found at [Release v0.1.0 - Initial Personal API Release · msbfyi/msbapi · GitHub](https://github.com/msbfyi/msbapi/releases/tag/v0.1.0)