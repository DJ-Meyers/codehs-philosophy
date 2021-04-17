/* eslint-disable no-console */
import PageParser from '../PageParser';

const PHILOSOPHY_URL = 'https://en.wikipedia.org/wiki/Philosophy';

/**
 * @class Responsible for controlling the recursive search for the Philosophy page
 */
export default class WikipediaNavigator {
  public constructor(max: number, print?: boolean) {
    this.maxHops = max;
    this.currentHops = 0;
    this.print = print ?? true;
  }

  private currentHops: number;

  private maxHops: number;

  private print: boolean;

  // TODO: Memoize to avoid cycles

  /**
   * Recursively search the first link of the current page until we reach the Philosophy page
   * @param url Current URL to be parsed
   * @returns Number of hops needed to reach the Philosophy page
   */
  public findPhilosophyFrom = async (url: string): Promise<number> => {
    if (this.print) console.log(`${url}`);

    // Base case for DFS
    if (url.toUpperCase() === PHILOSOPHY_URL.toUpperCase()) {
      return this.currentHops;
    }

    // Throw errors
    if (this.currentHops >= this.maxHops) {
      throw new Error(`Could not find philosophy in ${this.maxHops} hops`);
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
