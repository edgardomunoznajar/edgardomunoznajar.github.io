# Writing

Hand-written posts for edgardomunoznajar.github.io. Everything in this
directory is edited directly — there is no build step and no generator.

## Publishing a post

Two files change. No build step, no dependencies. GitHub Pages serves the
result on push.

**1. Create `posts/<slug>.html`** from `_template.html`, replacing every
placeholder:

| Placeholder | Meaning | Example |
|---|---|---|
| `POST_TITLE` | Post title, plain text | `The exponential bent` |
| `POST_SUMMARY` | One sentence, used for meta and social cards | `Growth stopped being exponential around April 2026.` |
| `POST_SLUG` | Filename without `.html`, lowercase, hyphenated | `the-exponential-bent` |
| `POST_DATE_ISO` | Machine date | `2026-08-27` |
| `POST_DATE_TEXT` | Readable date | `27 August 2026` |
| `POST_BODY` | The post itself, as HTML | `<p>…</p>` |

No placeholder is a prefix of another, so they can be substituted in any
order. That is deliberate: an earlier pair named `POST_DATE` and
`POST_DATE_HUMAN` corrupted the readable date into `2026-08-27_HUMAN`
whenever the shorter one was replaced first.

**2. Add the post to `posts/index.html`**, immediately after the
`<!-- POSTS:BEGIN -->` marker, so the newest post is first:

```html
<li>
  <h2><a href="<slug>.html">Title</a></h2>
  <time datetime="2026-08-27">27 August 2026</time>
  <p>The same one-sentence summary.</p>
</li>
```

Then **delete the `<div class="empty">…</div>` block** if it is still there.

The `POSTS:BEGIN` / `POSTS:END` markers exist so this file can be edited
programmatically: insert between them and nothing else on the page moves.
Leave both markers in place.

## Conventions

- **Body HTML only.** `style.css` already covers `h2`/`h3`, `p`, `ul`/`ol`,
  `pre > code`, `blockquote`, `table`, and `img`. Do not add a `<style>` block
  to a post and do not restate the palette — restyling the section should stay
  one edit, not one per post.
- **Slugs are permanent.** A published URL should not move. Pick the slug
  once; if a title later changes, the slug stays.
- **`_template.html` is reachable but unlisted.** This site ships a
  `.nojekyll` file, so Pages serves underscore-prefixed files rather than
  skipping them. The template is harmless to serve and nothing links to it —
  but do not assume the underscore hides it.
- **Claims get sources.** This site's whole argument is that the measuring
  instrument is stated. A post asserting something about the data should link
  to `data.json`, the CSV, or the collector that produced it.
