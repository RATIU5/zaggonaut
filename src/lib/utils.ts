import { getCollection, type CollectionEntry } from "astro:content";

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

let configCache: CollectionEntry<'configuration'> | null = null;

/**
 * Retrieves the configuration collection entry from the content directory.
 * It checks if the configuration is already cached to avoid multiple reads.
 * There can only be one configuration file, so it throws an error if there are multiple or none.
 * @returns the configuration collection entry
 */
export const getConfigurationCollection = async (): Promise<CollectionEntry<'configuration'>> => {
  if (configCache) return configCache;

  const configs = await getCollection("configuration");
  if (configs.length !== 1) {
    throw new Error("Configuration file not found or multiple configuration files present.");
  }
  configCache = configs[0];
  return configs[0];
}