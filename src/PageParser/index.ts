import Cheerio from 'cheerio';
import Got from 'got';

/**
 * @class Responsible for reading the HTML of a given URL
 */
export default class PageParser {
  /**
   * @param url Page to be parsed
   * @returns First link of the given page
   */
  public static getFirstLink = async (url: string): Promise<string> => {
    const res = await Got(url);
    const $ = Cheerio.load(res.body);

    // TODO: Refine this to avoid bad links
    const link = $('.mw-parser-output > p > a')
      .filter((index, element) => element.attribs.href !== url)
      .first()
      .attr('href');

    return `https://en.wikipedia.org${link}` ?? '';
  };
}
