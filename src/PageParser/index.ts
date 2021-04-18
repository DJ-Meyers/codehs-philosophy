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

    while (paragraph !== null) {
      let linkIndex = paragraph.html()?.indexOf('"/wiki/', start) ?? -1;

      // If we haven't found a link in this paragraph, try the next paragraph until we find one
      while (linkIndex < 0) {
        start = 0;
        paragraph = paragraph.siblings('p:not([class])').first();
        if (paragraph === null) return '';

        linkIndex = paragraph.html()?.indexOf('"/wiki/', start) ?? -1;
      }

      const text = paragraph.html() ?? '';
      const end = text.indexOf('"', linkIndex + 1);
      const link = text.substring(linkIndex + 2, end);
      start = linkIndex + 10;

      if (link !== undefined
        && link !== 'wiki/Outline_(list)'
        && PageParser.notInParens(text, linkIndex)
        && PageParser.notInSuper(text, linkIndex)) {
        return `https://en.wikipedia.org/${link}` ?? '';
      }
    }

    return '';
  };

  /**
   * @param html current paragraph
   * @param index end index of the parentheses count
   * @returns true if there is an equal number of '(' and ')' from start until index
   */
  private static notInParens = (html: string, index: number): boolean => {
    if (index > html.length) return false;

    let parenCount = 0;
    for (let i = 0; i < index; i += 1) {
      if (html.charAt(i) === '(') {
        parenCount += 1;
      } else if (html.charAt(i) === ')') {
        parenCount -= 1;
      }
    }

    return parenCount === 0;
  };

  /**
   * @param html current paragraph
   * @param index end index of the superscript count
   * @returns true if there is an equal number of '<sup' and '</sup' from start until index
   */
  private static notInSuper = (html: string, index: number): boolean => {
    if (index > html.length) return false;

    let tagCount = 0;
    let superIndex = 0;
    let tagClosed = true;

    while (superIndex >= 0 && superIndex < index) {
      superIndex = tagClosed ? html.indexOf('<sup', superIndex) : html.indexOf('</sup', superIndex);

      if (superIndex > 0 && superIndex < index) {
        tagClosed = !tagClosed;
        tagCount += tagClosed ? -1 : 1;
      }
    }

    return tagCount === 0;
  };
}
