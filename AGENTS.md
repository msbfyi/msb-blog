# Agent instructions — msb-blog

This file is the shared source of truth for AI coding tools working in this
repo (Claude Code, Cursor, Aider, Copilot, etc.). `CLAUDE.md` just points
here so there's one place to keep in sync.

## What this is

An [Eleventy](https://11ty.dev) (v3) static site for msb.fyi, deployed to
Cloudflare Pages on push to `main` (`.github/workflows/publish.yml`).

## Commands

- `npm install`
- `npm run watch:eleventy` — dev server with live reload (`http://localhost:8080`)
- `npm run build` — production build (`npm-run-all build:*`, currently just
  `eleventy`)
- No test suite exists. Verify changes by building (`npx eleventy`) and
  spot-checking rendered output in `_site/`.

## Commit messages — required, this is enforced by CI

**Use [Conventional Commits](https://www.conventionalcommits.org/).**
[release-please](https://github.com/googleapis/release-please)
(`.github/workflows/release-please.yml`) parses commit history on every
push to `main` to generate `CHANGELOG.md` and cut version tags. A commit
that doesn't follow this format is silently invisible to it — no error,
it just never shows up in a release.

- `fix: ...` → patch release
- `feat: ...` → minor release
- `feat!: ...` or a `BREAKING CHANGE:` footer → major release
- `docs:`, `chore:`, `refactor:`, `test:`, `ci:`, `build:` → tracked but
  hidden from the changelog

**Do not** use the old `[Breaking]` / `[Feature]` bracket-prefix
convention — that was `paulhatch/semantic-version`, which this repo no
longer uses.

**Do not** manually create git tags, edit `.release-please-manifest.json`,
or hand-write `CHANGELOG.md` entries — release-please owns all three via
its standing `chore(main): release X.Y.Z` PR.

## Versioning

The site footer's version string (`{% appVer %}` shortcode in
`.eleventy.js`) comes from `APP_VERSION`, set in `publish.yml` via
`git describe --tags`. It reflects the **last actual release**, not the
current commit — don't "fix" it to track HEAD.

## Design system

`src/assets/css/msb.css` is the **only** stylesheet, loaded by
`src/_includes/styles.njk` alongside the Google Fonts link (Krona One /
DM Sans / Barlow Condensed / JetBrains Mono). There is no
water.css/Font Awesome anymore, and no build step for CSS — it's plain
CSS, passthrough-copied as-is.

- Color/spacing tokens are CSS variables on `:root` (`--paper`, `--ink`,
  `--muted`, `--hair-c`, `--link`, etc.), with light/dark/auto variants —
  see the top of `msb.css`. New UI should use these tokens, not hardcoded
  colors.
- `.wrap` and `main` both carry the same max-width/padding box model —
  page content doesn't need its own wrapping div, `<main>` already
  provides it (see `page.njk`).
- Arbitrary markdown content (blog posts, static pages) renders inside
  `<article class="article">` (see `layouts/article.njk`), which has its
  own base prose rules in `msb.css` (headings, lists, code, tables,
  blockquotes). Don't reintroduce a CSS reset/framework for this — extend
  `.article` instead.
- Nav is data-driven off `collections.all | eleventyNavigation` in
  `header.njk` — add a page to the nav via that page's own front matter
  (`eleventyNavigation: { key, order }`), never by hardcoding a link in
  `header.njk`.

## Known footgun: pagination + a static `permalink`

Don't combine a static front-matter `permalink:` with a `pagination:`
block on the same template — if the collection ever grows past the page
`size`, every resulting page resolves to the same static permalink and
the build fails with a duplicate-output-permalink error (this happened
with `src/thisWeekInLinks.njk` once its collection passed 100 items). If
a page needs "show the whole collection, no cap," pull the collection
directly instead (`{% set articles = collections.whatever %}`, as in
`category.njk` and `thisWeekInLinks.njk`), not pagination with an
oversized `size`.
