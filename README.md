# edgardomunoznajar.github.io

Ed Galvez's personal site and blog. Hand-written HTML until 2026-09-03; now
built with [Eleventy](https://www.11ty.dev/) so a post is one Markdown file
and everything else is generated. The design is unchanged — the old
`index.html` and post template became the layouts verbatim.

## How publishing works

1. **Source is pushed to `main`** — by Airlock's publishing pipeline (a post
   approved through its Decisions inbox), or by Ed directly.
2. **GitHub Actions builds and deploys** (`.github/workflows/build.yml`):
   `npm ci`, `npx @11ty/eleventy`, deploy `_site/` to Pages. No build ever
   happens on a serving path; nothing in `main` is generated output.

The design record for the pipeline lives in the airlock repo:
`docs/PROGRAM-publishing-pipeline.md`.

### One-time switch when this branch first merges

Pages currently serves the branch root (legacy build). Before merging this
conversion to `main`, flip **Settings → Pages → Source** to **GitHub
Actions**, then merge. Order matters: merged-but-not-switched serves a
broken site (the root `index.html` no longer exists); switched-but-not-merged
just keeps serving the last legacy deploy until the first workflow run.

## Writing a post

Create `src/posts/<slug>.md`:

```markdown
---
title: The exponential bent
summary: Growth stopped being exponential around April 2026.
date: 2026-08-27
---

The post body, in Markdown.
```

The filename (minus `.md`) is the slug; the post serves at
`/posts/<slug>.html`, appears on `/posts/`, in `/feed.xml` and in
`/sitemap.xml`, all generated.

To preview locally (Node ≥ 24):

```bash
npm ci
npm run serve    # http://localhost:8080
```

## Layout

- `src/index.html` — the home page, front-mattered but otherwise the same
  hand-written document it always was. Edit it directly.
- `src/_includes/post.njk` — post layout (the old `posts/_template.html`).
- `src/posts/*.md` — posts.
- `src/posts/index.njk` — the writing index, generated from the collection.
- `src/posts/style.css` — post styling; keep its palette in step with the
  home page's `<style>` block.
- `src/feed.xml.njk`, `src/sitemap.xml.njk`, `src/robots.txt`.

No client JavaScript, no og-image (a card image is only added once a real
file ships — never point a meta tag at a file that does not exist).
