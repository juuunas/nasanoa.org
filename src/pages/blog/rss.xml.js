import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const blogPosts = await getCollection("posts");
  return rss({
    // `<title>` field in output xml
    title: "nasanoa's blog",
    // `<description>` field in output xml
    description: "A blog about music and stuff.",
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: `${context.site}blog`,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blogPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      link: `/blog/post/${post.slug}`,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
