# MSB.fyi - Michael Sean Becker's home on the internet

[![Deploy to Cloudflare Pages](https://github.com/msbfyi/msb-blog/actions/workflows/publish.yml/badge.svg)](https://github.com/msbfyi/msb-blog/actions/workflows/publish.yml)

## Build with[^1]
[![Eleventy Badge](https://img.shields.io/badge/Eleventy-222?logo=eleventy&logoColor=fff&style=flat)](http://11ty.dev)
[![GitHub Actions Badge](https://img.shields.io/badge/GitHub%20Actions-2088FF?logo=githubactions&logoColor=fff&style=flat)](https://github.com/features/actions)
[![Cloudflare Badge](https://img.shields.io/badge/Cloudflare-F38020?logo=cloudflare&logoColor=fff&style=flat)](https://cloudflare.com)
[![Podcast Index Badge](https://img.shields.io/badge/Podcast%20Index-F90000?logo=podcastindex&logoColor=fff&style=flat)](https://podcastindex.org)
[![Directus Badge](https://img.shields.io/badge/Directus-263238?logo=directus&logoColor=fff&style=flat)](http://directus.io)
[![Supabase Badge](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff&style=flat)](https://supabase.com)

Based on [Eleventy Not So Minimal Blog Starter](https://github.com/mangamaui/eleventy-not-so-minimal-blog-starter)

## Versions

I'm using [paulhatch/semantic-version@v5.3.0](https://github.com/paulhatch/semantic-version/tree/v5.3.0/) to manage bumping verions for commits.

In a commit, you must start the commit message with the key word to bump major or minor versions. A commit with out those will update the patch.

major.minor.patch

### How to tag

In a commit, start with [XXX] following the patterns below. If multiple prefixes are used in a pull request it will default to the highest version and only increment by one.

Major version: [Breaking]

Minor version: [Feature]

[^1]: Badges from https://badges.pages.dev/
