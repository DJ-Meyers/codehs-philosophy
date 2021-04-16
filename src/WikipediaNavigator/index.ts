/* eslint-disable no-console */
import PageParser from '../PageParser';

const PHILOSOPHY_URL = 'https://en.wikipedia.org/wiki/Philosophy';

/**
 * @class Responsible for controlling the recursive search for the Philosophy page
 */
export default class WikipediaNavigator {
  public constructor(max: number) {
    this.maxHops = max;
    this.currentHops = 0;
  }

  private currentHops: number;

  private maxHops: number;

  // TODO: Memoize to avoid cycles

  /**
   * Recursively search the first link of the current page until we reach the Philosophy page
   * @param url Current URL to be parsed
   * @returns Number of hops needed to reach the Philosophy page
   */
  public findPhilosophyFrom = async (url: string): Promise<number> => {
    console.log(`${url}`);

    // Base case for DFS
    if (url.toUpperCase() === PHILOSOPHY_URL.toUpperCase()) {
      return this.currentHops;
    }

    // Throw errors
    if (this.currentHops >= 100) {
      throw new Error('Greater than 100');
    } else if (!this.isValid(url)) {
      throw new Error(`${url} is not a valid Https Wikipedia URL.`);
    }

    this.currentHops += 1;
    return PageParser.getFirstLink(url)
      .then((res) => this.findPhilosophyFrom(res))
      .catch(() => -1);
  };

  /**
   * Check that the current URL is valid before making a request for it
   * @param url Current URL to be parsed
   * @returns True if the URL starts with the wikipedia base URL
   */
  private isValid = (url: string): boolean => url.startsWith('https://en.wikipedia.org/wiki/');
}
