# Changelog

## Prior releases

_Everything below predates [release-please](https://github.com/googleapis/release-please), which now generates this file automatically for every release from here on. The old versioning scheme (`paulhatch/semantic-version`) tagged nearly every commit, so only minor/major milestones are summarized here — each links to the full commit range on GitHub._

### [2.0.0](https://github.com/msbfyi/msb-blog/compare/v1.13.0...v2.0.0) (2026-08-21)

- Redesigned site chrome and homepage with the new msb.fyi visual identity: new type system and color tokens, a monogram identity plate, pill nav rail with light/dark/auto mode, and a "dispatch" callout + year-grouped index on the homepage.
- Dropped the water.css and Font Awesome dependencies in favor of the new design's own tokens.
- Fixed a build-breaking pagination/static-permalink collision on `/this-week-in-links/`, and stray-markup/missing-description bugs on the podroll and blogroll pages.

### [1.13.0](https://github.com/msbfyi/msb-blog/compare/v1.12.0...v1.13.0) (2026-07-16)

- Added a `/cal` interstitial page with a custom og:image.

### [1.12.0](https://github.com/msbfyi/msb-blog/compare/v1.11.0...v1.12.0) (2026-02-07)

- Migrated Mastodon references from 103.social to social.lol.
- Replaced the third-party Mastodon archive plugin with a local version with proper error handling.

### [1.11.0](https://github.com/msbfyi/msb-blog/compare/v1.10.0...v1.11.0) (2025-01-16)

- Restored DecapCMS.
- Added cache-busting for CSS and JS assets.

### [1.10.0](https://github.com/msbfyi/msb-blog/compare/v1.9.0...v1.10.0) (2025-01-07)

- Added `/then` links to previous `/now` pages, and automated `/now`/wishlist updates.
- New site logos.

### [1.9.0](https://github.com/msbfyi/msb-blog/compare/v1.8.0...v1.9.0) (2024-10-24)

- Added the `fediverse:creator` meta tag.
- Fixed `/now` archive date bugs.

### [1.8.0](https://github.com/msbfyi/msb-blog/compare/v1.7.0...v1.8.0) (2024-10-21)

- Home and links pages now surface the latest This Week In Links issue.

### [1.7.0](https://github.com/msbfyi/msb-blog/compare/v1.6.0...v1.7.0) (2024-10-21)

- Added a lightbox for images; began migrating toward an eleventy-satisfactory-style config.

### [1.6.0](https://github.com/msbfyi/msb-blog/compare/v1.5.0...v1.6.0) (2024-10-17)

- Documented the (now-retired) versioning convention in the README.

### [1.5.0](https://github.com/msbfyi/msb-blog/compare/v1.4.0...v1.5.0) (2024-10-17)

- Upgraded to Eleventy 3.0.

### [1.4.0](https://github.com/msbfyi/msb-blog/compare/v1.3.0...v1.4.0) (2024-07-05)

- Added Umami analytics (build-time only).
- Added a Clacks Overhead / GNU Terry Pratchett link to the footer.

### [1.3.0](https://github.com/msbfyi/msb-blog/compare/v1.2.0...v1.3.0) (2024-06-27)

- Added `/chipotle`, `/coffee`, and podroll pages.
- Added DecapCMS and draft support for posts.
- Added the Tweet Archive footer link and updated social images.

### [1.2.0](https://github.com/msbfyi/msb-blog/releases/tag/v1.2.0) (2024-04-09)

- Earliest tagged release in this repo's history.
