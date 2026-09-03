/*
 * Eleventy build for edgardomunoznajar.github.io.
 *
 * The site was hand-written HTML until 2026-09-03; this config exists to keep
 * every URL and every visual decision from that era intact while making posts
 * cheap: a post is one Markdown file in src/posts/, everything else is
 * generated. Airlock's publishing pipeline commits post files here and GitHub
 * Actions runs this build — nothing on the serving path is hand-assembled any
 * more (docs/PROGRAM-publishing-pipeline.md in the airlock repo is the design
 * record).
 */

export default function (eleventyConfig) {
  // Served byte-for-byte. style.css stays at /posts/style.css because every
  // post links it relatively, and robots.txt already names the sitemap URL.
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/posts/style.css": "posts/style.css" });
  // Pages deployed through actions/deploy-pages never runs Jekyll, but the
  // marker is kept so a fallback to branch-serving stays safe.
  eleventyConfig.addPassthroughCopy({ "src/.nojekyll": ".nojekyll" });

  // Machine date for <time datetime> and the feed: 2026-08-27.
  eleventyConfig.addFilter("isoDate", function (value) {
    const date = new Date(value);
    return date.toISOString().slice(0, 10);
  });

  // Readable date in the shape the old hand-written template used:
  // "27 August 2026". en-AU gives day-first without punctuation.
  eleventyConfig.addFilter("textDate", function (value) {
    const date = new Date(value);
    return new Intl.DateTimeFormat("en-AU", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  });

  // RFC-3339 instant for the Atom feed's <updated> elements.
  eleventyConfig.addFilter("rfc3339", function (value) {
    const date = new Date(value);
    return date.toISOString();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
}
