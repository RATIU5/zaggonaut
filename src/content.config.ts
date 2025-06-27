import { defineCollection, z } from "astro:content";
import { file, glob } from "astro/loaders";
import { parse as parseToml } from "toml";

/**
 * Loader and schema for the configuration collection.
 * It loads a TOML file from the `content/configuration.toml` path and defines the schema for the configuration data.
 */
const configuration = defineCollection({
  loader: file("content/configuration.toml", {
    parser: (text) => JSON.parse(JSON.stringify(parseToml(text))),
  }),
  schema: z.object({
    /**
     * Core site configuration.
     */
    site: z.object({
      /**
       * This should be the base URL of your live site,
       * and is used to generate absolute URLs for links and metadata.
       */
      baseUrl: z.string().url(),
    }),

    /**
     * The global metadata for the site. If specific page metadata is not provided,
     * this metadata will be used as a fallback for SEO and Open Graph tags.
     */
    globalMeta: z.object({
      /**
       * The title of the page, used in the HTML `<title>` tag and Open Graph metadata.
       */
      title: z.string(),

      /**
       * The short description of the page, used in Open Graph metadata and as a fallback for SEO.
       */
      description: z.string(),

      /**
       * The long description of the page, used in Open Graph metadata and as a fallback for SEO.
       */
      longDescription: z.string().optional(),

      /**
       * The URL of the card image for social media sharing.
       */
      cardImage: z.string().url().optional(),

      /**
       * Keywords for SEO, used in the `<meta name="keywords">` tag.
       */
      keywords: z.array(z.string()).optional(),
    }),

    notFoundMeta: z.object({
      /**
       * The title of the page, used in the HTML `<title>` tag and Open Graph metadata.
       */
      title: z.string(),

      /**
       * The short description of the page, used in Open Graph metadata and as a fallback for SEO.
       */
      description: z.string(),

      /**
       * The long description of the page, used in Open Graph metadata and as a fallback for SEO.
       */
      longDescription: z.string().optional(),

      /**
       * The URL of the card image for social media sharing.
       */
      cardImage: z.string().url().optional(),

      /**
       * Keywords for SEO, used in the `<meta name="keywords">` tag.
       */
      keywords: z.array(z.string()).optional(),
    }),

    /**
     * The blog page's metadata.
     */
    blogMeta: z.object({
      /**
       * The title of the page, used in the HTML `<title>` tag and Open Graph metadata.
       */
      title: z.string(),

      /**
       * The short description of the page, used in Open Graph metadata and as a fallback for SEO.
       */
      description: z.string(),

      /**
       * The long description of the page, used in Open Graph metadata and as a fallback for SEO.
       */
      longDescription: z.string().optional(),

      /**
       * The URL of the card image for social media sharing.
       */
      cardImage: z.string().url().optional(),

      /**
       * Keywords for SEO, used in the `<meta name="keywords">` tag.
       */
      keywords: z.array(z.string()).optional(),
    }),

    /**
     * The project page's metadata.
     */
    projectMeta: z.object({
      /**
       * The title of the page, used in the HTML `<title>` tag and Open Graph metadata.
       */
      title: z.string(),

      /**
       * The short description of the page, used in Open Graph metadata and as a fallback for SEO.
       */
      description: z.string(),

      /**
       * The long description of the page, used in Open Graph metadata and as a fallback for SEO.
       */
      longDescription: z.string().optional(),

      /**
       * The URL of the card image for social media sharing.
       */
      cardImage: z.string().url().optional(),

      /**
       * Keywords for SEO, used in the `<meta name="keywords">` tag.
       */
      keywords: z.array(z.string()).optional(),
    }),

    /**
     * The hero section configuration.
     */
    hero: z.object({
      /**
       * The title displayed in the hero section.
       */
      title: z.string().default("Zaggonaut"),

      /**
       * The subtitle displayed in the hero section.
       */
      subtitle: z.string().default("Retro-Inspired Theme &<br>Built for Astro"),

      /**
       * The URL of the hero image, used as a background image in the hero section.
       */
      image: z.string().url().optional(),

      /**
       * The text displayed in the call-to-action button in the hero section.
       */
      ctaText: z.string().default("View Projects"),

      /**
       * The URL of the call-to-action button in the hero section.
       */
      ctaUrl: z.string().default("/projects"),
    }),

    /**
     * The personal information of the site owner or author.
     */
    personal: z.object({
      /**
       * The name of the site owner or author, used in various places throughout the site.
       */
      name: z.string().default("Zaggonaut"),

      /**
       * The GitHub profile URL of the site owner or author.
       */
      githubProfile: z.string().url().optional(),

      /**
       * The Twitter profile URL of the site owner or author.
       */
      twitterProfile: z.string().url().optional(),

      /**
       * The LinkedIn profile URL of the site owner or author.
       */
      linkedinProfile: z.string().url().optional(),
    }),

    /**
     * Commonly used text used throughout the site.
     */
    texts: z.object({
      /**
       * The text used when displaying the articles section on the homepage.
       */
      articlesName: z.string().default("Articles"),

      /**
       * The text used when displaying the projects section on the homepage.
       */
      projectsName: z.string().default("Projects"),

      /**
       * The text used for the "View All" button in the articles and projects sections.
       */
      viewAll: z.string().default("View All"),

      /**
       * The text displayed when there are no articles found.
       */
      noArticles: z.string().default("No articles found."),

      /**
       * The text displayed when there are no projects found.
       */
      noProjects: z.string().default("No projects found."),
    }),

    /**
     * The menu configuration for the site.
     * This defines the URLs for the main navigation links.
     */
    menu: z.object({
      home: z.string().default("/"),
      projects: z.string().default("/projects"),
      blog: z.string().default("/blog"),
      /** Add other menu items here **/
    }),
  }),
});

/**
 * Loader and schema for the blog collection.
 * It loads markdown files from the `content/blogs` directory and defines the schema for each blog post.
 */
const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/blogs" }),
  schema: z
    .object({
      /**
       * The title of the blog post.
       */
      title: z.string(),

      /**
       * The slug for the blog post, used in the URL.
       */
      slug: z.string().optional(),

      /**
       * A short description of the blog post, used in Open Graph metadata and as a fallback for SEO.
       */
      description: z.string(),

      /**
       * The long description of the blog post, used in Open Graph metadata and as a fallback for SEO.
       */
      longDescription: z.string().optional(),

      /**
       * The URL of the card image for social media sharing.
       */
      cardImage: z.string().url().optional(),

      /**
       * The tags associated with the blog post, used for categorization and filtering.
       */
      tags: z.array(z.string()).optional(),

      /**
       * The estimated reading time of the blog post, in minutes.
       */
      readTime: z.number().optional(),

      /**
       * Whether the blog post is featured on the homepage.
       */
      featured: z.boolean().default(false),

      /**
       * The timestamp of the blog post, used for sorting and displaying the date.
       */
      timestamp: z.date().transform((val) => new Date(val)),
    })
    .transform((data) => {
      const slug =
        data.slug ??
        data.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
      const newData = {
        ...data,
        slug,
      };
      return newData;
    }),
});

/**
 * Loader and schema for the project collection.
 * It loads markdown files from the `content/projects` directory and defines the schema for each project.
 */
const project = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./content/projects" }),
  schema: z.object({
    /**
     * The title of the project.
     */
    title: z.string(),
    
    /**
     * The slug for the project, used in the URL.
     */
    slug: z.string().optional(),

    /**
     * The short description of the project, used in Open Graph metadata and as a fallback for SEO.
     */
    description: z.string(),

    /**
     * The long description of the project, used in Open Graph metadata and as a fallback for SEO.
     */
    longDescription: z.string().optional(),

    /**
     * The URL of the card image for social media sharing.
     */
    cardImage: z.string().url().optional(),

    /**
     * The tags associated with the project, used for categorization and filtering.
     */
    tags: z.array(z.string()).optional(),

    /**
     * The github repository URL for the project.
     */
    githubUrl: z.string().url().optional(),

    /**
     * The live demo URL for the project, if applicable.
     */
    liveDemoUrl: z.string().url().optional(),

    /**
     * The timestamp of the project, used for sorting and displaying the date.
     */
    timestamp: z.date().transform((val) => new Date(val)),

    /**
     * Whether the project is featured on the homepage.
     */
    featured: z.boolean().default(false),
  }).transform((data) => {
      const slug =
        data.slug ??
        data.title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]/g, "");
      const newData = {
        ...data,
        slug,
      };
      return newData;
    }),
});

export const collections = { blog, project, configuration };
