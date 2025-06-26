import fs from "node:fs/promises";
import { GLOBAL } from "./variables";
import { getCollection, type CollectionEntry } from "astro:content";

type MarkdownData<T extends object> = {
  frontmatter: T;
  file: string;
  url: string;
};

/**
 * This function processes the content of a directory and returns an array of processed content.
 * It takes a content type, a function to process the content, and an optional directory.
 * If no directory is provided, it defaults to the current working directory.
 * 
 * @param contentType the type of content to process
 * @param processFn the function to process the content
 * @param dir the directory to process the content from
 * @returns a promise that resolves to an array of processed content
 */
export const processContentInDir = async <T extends object, K>(
  contentType: "projects" | "blog",
  processFn: (data: MarkdownData<T>) => K,
  dir: string = process.cwd(),
) => {
  const files = await fs.readdir(dir + `/src/pages/${contentType}`);
  const markdownFiles = files
    .filter((file: string) => file.endsWith(".md"))
    .map((file) => file.split(".")[0]);
  const readMdFileContent = async (file: string) => {
    if (contentType === "projects") {
      const content = import.meta
        .glob(`/src/pages/projects/*.md`)
        [`/src/pages/projects/${file}.md`]();
      const data = (await content) as {
        frontmatter: T;
        file: string;
        url: string;
      };
      return processFn(data);
    } else {
      const content = import.meta
        .glob(`/src/pages/blog/*.md`)
        [`/src/pages/blog/${file}.md`]();
      const data = (await content) as {
        frontmatter: T;
        file: string;
        url: string;
      };
      return processFn(data);
    }
  };
  return await Promise.all(markdownFiles.map(readMdFileContent));
};

/**
 * Shortens a string by removing words at the end until it fits within a certain length.
 * @param content the content to shorten
 * @param maxLength the maximum length of the shortened content (default is 20)
 * @returns a shortened version of the content
 */
export const getShortDescription = (content: string, maxLength = 20) => {
  const splitByWord = content.split(" ");
  const length = splitByWord.length;
  return length > maxLength ? splitByWord.slice(0, maxLength).join(" ") + "..." : content;
};

/**
 * Processes the date of an article and returns a string representing the processed date.
 * @param timestamp the timestamp to process
 * @returns a string representing the processed timestamp
 */
export const processArticleDate = (date: Date) => {
  const monthSmall = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();
  return `${monthSmall} ${day}, ${year}`;
};

/**
 * Generates a source URL for a content item. The URL is used in meta tags and social media cards.
 * @param sourceUrl the source URL of the content
 * @param contentType the type of content (either "projects" or "blog")
 * @returns a string representing the source URL with the appropriate domain
 */
export const generateSourceUrl = (
  sourceUrl: string,
  contentType: "projects" | "blog",
) => {
  return `${GLOBAL.rootUrl}/${contentType}/${sourceUrl}`;
};

let configCache: CollectionEntry<'configuration'>['data'] | null = null;
let cacheInitialized = false;

/**
 * Initializes the configuration cache once during build/render time.
 * Prevents repeated expensive getCollection calls across multiple function invocations.
 * Throws an error if configuration data is missing to ensure reliability.
 */
const initializeConfigCache = async (): Promise<void> => {
  if (cacheInitialized) return;
  
  const config = await getCollection('configuration');
  const configData = config[0]?.data;
  
  if (!configData) {
    throw new Error('Configuration data is missing. Ensure content/configuration.toml exists and is properly formatted.');
  }
  
  configCache = configData;
  cacheInitialized = true;
};

/**
 * Retrieves all configuration data when using wildcard.
 * @param key - The wildcard "*" to return all configuration data
 * @returns Promise resolving to the complete configuration object
 */
export async function getFormattedConfig(key: "*"): Promise<CollectionEntry<'configuration'>['data']>;

/**
 * Retrieves a specific configuration section by key with full type safety.
 * @param key - The specific configuration section key to retrieve ("site" | "collections")
 * @returns Promise resolving to the typed section
 */
export async function getFormattedConfig<K extends keyof CollectionEntry<'configuration'>['data']>(
  key: K
): Promise<CollectionEntry<'configuration'>['data'][K]>;

/**
 * Internal implementation that handles both wildcard and specific section retrieval.
 * Uses persistent cache to avoid repeated getCollection calls during build/render time.
 */
export async function getFormattedConfig(
  key: keyof CollectionEntry<'configuration'>['data'] | "*"
): Promise<CollectionEntry<'configuration'>['data'] | CollectionEntry<'configuration'>['data'][keyof CollectionEntry<'configuration'>['data']]> {
  await initializeConfigCache();

  if (key === "*") {
    return configCache!;
  }
  
  return configCache![key];
}
