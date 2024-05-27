import { defineCollection, z } from "astro:content";

export const collections = {
  releases: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      type: z.enum(["album", "compilation", "misc"]).default("album"),
      image: z.string(),
      sources: z.array(
        z.object({
          name: z.string(),
          url: z.string(),
        })
      ),
    }),
  }),
  pages: defineCollection({
    type: "content",
    schema: z.object({}),
  }),
  posts: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.date(),
    }),
  }),
};
