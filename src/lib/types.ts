import type { CollectionEntry } from "astro:content";

export type ArticleFrontmatter = CollectionEntry<"blog">["data"] & {
  url: string;
}; 

export type ProjectFrontmatter = CollectionEntry<"project">["data"] & {
  url: string;
};