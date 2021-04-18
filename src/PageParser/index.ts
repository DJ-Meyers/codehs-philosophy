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

    let paragraph = $('.mw-parser-output > p:not([class])').first(); // :not([class]) ignores the disambiguations
    let start = 0;
    const stillSearching = true;

    while (stillSearching) {
      let linkIndex = paragraph.html()?.indexOf('"/wiki/', start) ?? -1;

      if (linkIndex < 0) {
        start = 0;
        paragraph = paragraph.siblings('p:not([class])').first();
        linkIndex = paragraph.html()?.indexOf('"/wiki/', start) ?? -1;
      }

      const end = paragraph.html()?.indexOf('"', linkIndex + 1);
      const link = paragraph.html()?.substring(linkIndex + 2, end);
      start = linkIndex + 10;

      if (link === 'wiki/Outline_(list)' || link === undefined) continue;
      if (!PageParser.insideParens(paragraph.html() ?? '', linkIndex) && !PageParser.insideSuper(paragraph.html() ?? '', linkIndex)) {
        return `https://en.wikipedia.org/${link}` ?? '';
      }
    }

    return '';
  };

  private static insideParens = (html: string, index: number): boolean => {
    if (index > html.length) return false;

    let parenCount = 0;
    for (let i = 0; i < index; i += 1) {
      if (html.charAt(i) === '(') {
        parenCount += 1;
      } else if (html.charAt(i) === ')') {
        parenCount -= 1;
      }
    }

    return parenCount !== 0;
  };

  private static insideSuper = (html: string, index: number): boolean => {
    if (index > html.length) return false;

    let superTags = 0;
    let superIndex = 0;

    while (superIndex != -1 && superIndex < index) {
      superIndex = html.indexOf('<sup', superIndex);
      if (superIndex > 0 && superIndex < index) {
        superTags += 1;
      }
      superIndex = html.indexOf('</sup', superIndex);
      if (superIndex > 0 && superIndex < index) {
        superTags -= 1;
      }
    }

    return superTags !== 0;
  };

  // private static insideSuper = (index: number): boolean => {

  // }
}
